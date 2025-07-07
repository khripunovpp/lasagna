import {inject, Injectable, signal, Signal} from '@angular/core';
import {Invoice} from '../service/Inovice/Invoice';
import {InvoiceItemFactory} from '../service/InvoiceItem/InvoiceItem.factory';
import {InvoiceDTO} from '../service/Inovice/Invoice.scheme';
import {InvoiceItemBase} from '../service/InvoiceItem/InvoiceItemBase.abstract';
import {InvoiceItemType} from '../service/InvoiceItem/InvoiceItem.types';
import {InvoicesRepository} from '../service/Invoices.repository';
import {ProductsRepository, RecipesRepository} from '../../../shared/service/repositories';
import {Product} from '../../products/service/Product';
import {Recipe} from '../../recipes/service/models/Recipe';
import {LoggerService} from '../../logger/logger.service';
import {Credential} from '../../settings/service/models/Credential';
import {CredentialsRepository} from '../../settings/service/repositories/credentials.repository';
import {Tax} from '../../settings/service/models/Tax';


type PayloadMap = Partial<Record<InvoiceItemType, Map<string, number>>>;

/**
 * Сервис для построения и управления счетами-фактурами.
 *
 * Этот сервис позволяет загружать, изменять и сохранять счета-фактуры,
 * а также управлять их строками (позициями).
 *
 * Дозагружает продуктовые позиции и рецепты по их UUID
 */
@Injectable()
export class InvoiceBuilderService {
  constructor(
    private _invoicesRepository: InvoicesRepository,
    private _productsRepository: ProductsRepository,
    private _recipesRepository: RecipesRepository,
    private _credentialsRepository: CredentialsRepository,
  ) {
  }

  private _builderLogger = inject(LoggerService).withContext({
    label: 'InvoiceBuilderService',
    color: '#8e44ad',
  });
  // TODO кеш должен быть в сервисе работы с базой данных, а не в билдере счета-фактуры
  /**
   * Кеш загруженных продуктовых позиций или рецептов.
   * @private
   */
  private _cache: Partial<Record<InvoiceItemType, Map<string, unknown>>> = {
    [InvoiceItemType.Product]: new Map(),
    [InvoiceItemType.Recipe]: new Map(),
  };
  /**
   * Фабрика для создания позиций счета-фактуры.
   */
  factory = new InvoiceItemFactory();

  /**
   * Сигнал для хранения текущего счета-фактуры.
   * Используется для реактивного обновления UI при изменении данных счета-фактуры.
   */
  private _invoice = signal<Invoice | undefined>(undefined);

  get invoice(): Signal<Invoice | undefined> {
    return this._invoice;
  }

  set invoice(invoice: Invoice) {
    this._invoice.set(invoice);
  }

  /**
   * Загружает счет-фактуру по UUID и хранит в сервисе.
   * @param uuid
   */
  async loadInvoice(
    uuid: string
  ) {
    const invoice = await this._invoicesRepository.getOne(uuid);
    if (!invoice) {
      return undefined;
    }
    const payload = this._collectPayloadMap(invoice.rows);

    await this._loadRecipePayloads(invoice, payload);
    await this._loadProductPayloads(invoice, payload);
    await this._loadOtherPayloads(invoice);
    this._builderLogger.log(`Loaded invoice with UUID: ${uuid}`, invoice);

    this._invoice.set(invoice);
    return invoice;
  }

  /**
   * Удаляет ссылку на текущий счет-фактуру.
   */
  reset() {
    this._invoice.set(undefined);
  }

  /**
   * Обновляет текущий счет-фактуру с помощью данных, например, из формы.
   * @param formValue
   */
  patchInvoice(
    formValue: unknown,
  ): Invoice | undefined {
    const values = formValue as any;
    const newInvoice = this._invoice()!.clone();
    const commonInvoiceDTO: Partial<InvoiceDTO> = {
      name: values.name ?? '',
      credential_from_string: values.credential_from_string,
      credential_to_string: values.credential_to_string,
      date_issued: values.date_issued ? new Date(values.date_issued).getTime() : null,
      date_due: values.date_due ? new Date(values.date_due).getTime() : null,
      notes: values.notes || null,
      terms: values.terms || null,
      invoice_number: values.invoice_number || '',
      prefix: values.prefix || '',
      system_credential_id: values.system_credential_id?.id || null,
      customer_credential_id: values.customer_credential_id?.id || null,
    };
    const rowsDTO = values.rows.map((row: any) => {
      return {
        amount: row.amount ? parseFloat(row.amount) : 0,
        unit: row.unit || 'gram',
        type: (row.type || InvoiceItemType.Product) as InvoiceItemType,
        product_id: row.product_id,
        recipe_id: row.recipe_id,
      };
    });
    const taxesDTO = values.taxes_and_fees?.map((tax: any) => tax.toDTO()) || [];
    newInvoice.patch(commonInvoiceDTO);
    newInvoice.patchRows(rowsDTO, this.factory);
    newInvoice.replaceTaxes(taxesDTO)
    this._builderLogger.log(`Patched invoice with UUID: ${newInvoice.uuid}`, {values, newInvoice,oldInvoice: this._invoice()});
    this._invoice.set(newInvoice);
    return this._invoice();
  }

  /**
   * Добавляет новую строку в счет-фактуру.
   */
  addRow(
    type?: InvoiceItemType,
  ): InvoiceItemBase | undefined {
    if (!this._invoice()) return undefined;
    const newItem = this.factory.fromDTO({
      type: type,
    });
    if (!newItem) return undefined;
    const newInvoice = this._invoice()!.clone();
    newInvoice.addItem(newItem);
    this._invoice.set(newInvoice);

    return newItem;
  }

  /**
   * Удаляет строку из счета-фактуры по индексу.
   * @param index
   */
  removeRow(
    index: number
  ) {
    if (!this._invoice()) return undefined;
    const newInvoice = this._invoice()!.clone();
    const removedItem = newInvoice.removeItem(index);
    this._invoice.set(newInvoice);
    return removedItem;
  }

  setProductPayload(
    index: number,
    payload: Product
  ): InvoiceItemBase | undefined {
    this._setPayload(index, payload);
    return this._invoice()?.getRow(index);
  }

  async setRecipePayload(
    index: number,
    recipe: Recipe
  ): Promise<InvoiceItemBase | undefined> {

    const dbRecipe = await this._recipesRepository.getOne(recipe.uuid, true);
    if (!dbRecipe) {
      this._builderLogger.error(`Recipe with UUID ${recipe.uuid} not found in database.`);
      return undefined;
    }

    this._setPayload(index, dbRecipe);
    return this._invoice()?.getRow(index);
  }

  /**
   * Изменяет тип строки в счете-фактуре по индексу сбрасвая все данные текущей строки.
   * @param index
   * @param type
   */
  changeRowType(
    index: number,
    type: InvoiceItemType
  ): Invoice | undefined {
    if (!this._invoice()) return undefined;
    const newInvoice = this._invoice()!.clone();
    const targetItem = newInvoice.rows[index];
    if (!targetItem) return undefined;

    const newItem = this.factory.fromDTO({type});
    if (!newItem) return undefined;

    newInvoice.rows[index] = newItem;
    this._invoice.set(newInvoice);
    return this._invoice();
  }

  /**
   * Устанавливает учетные данные (credential) для счета-фактуры.
   * @param credential
   */
  setCredential(
    credential: Credential | undefined
  ) {
    if (!this._invoice() || !credential) return undefined;
    const newInvoice = this._invoice()!.clone();
    newInvoice.setCredential(credential);
    this._invoice.set(newInvoice);
    return this._invoice();
  }

  deleteCredential(
    type: 'system' | 'customer'
  ) {
    if (!this._invoice()) return undefined;
    const newInvoice = this._invoice()!.clone();
    newInvoice.removeCredential(type);
    this._invoice.set(newInvoice);
    return this._invoice();
  }

  markPaid() {
    if (!this._invoice()) return;
    const newInvoice = this._invoice()!.clone();
    newInvoice.markPaid();
    this._invoice.set(newInvoice);
  }

  markAsCanceled() {
    if (!this._invoice()) return;
    const newInvoice = this._invoice()!.clone();
    newInvoice.markCancelled();
    this._invoice.set(newInvoice);
  }

  markAsDraft() {
    if (!this._invoice()) return;
    const newInvoice = this._invoice()!.clone();
    newInvoice.state = 'draft' as any; // Reset state to draft TODO for tese only
    this._invoice.set(newInvoice);
  }

  issueInvoice() {
    if (!this._invoice()) return;
    const newInvoice = this._invoice()!.clone();
    newInvoice.issue();
    this._invoice.set(newInvoice);
  }

  addTax(
    tax: Tax
  ): Invoice | undefined {
    if (!this._invoice()) return undefined;
    const newInvoice = this._invoice()!.clone();
    newInvoice.addTax(tax);
    this._invoice.set(newInvoice);
    return this._invoice();
  }

  removeTax(
    tax: Tax
  ): Invoice | undefined {
    if (!this._invoice()) return undefined;
    const newInvoice = this._invoice()!.clone();
    newInvoice.removeTax(tax);
    this._invoice.set(newInvoice);
    return this._invoice();
  }

  /**
   * Устанавливает полезную нагрузку (payload) для позиции в счете-фактуре по индексу.
   * @param index Индекс позиции в счете-фактуре.
   * @param payload Полезная нагрузка, которую нужно установить.
   */
  private _setPayload(
    index: number,
    payload: Product | Recipe
  ): Invoice | undefined {
    if (!this._invoice()) return undefined;
    const newInvoice = this._invoice()!.clone();
    const targetItem = newInvoice.rows[index];
    if (!targetItem) return undefined;
    targetItem.setPayload(payload);
    this._invoice.set(newInvoice);
    return this._invoice();
  }

  /**
   * Загружает продуктовые позиции и рецепты по их UUID из кеша или репозитория.
   * @param invoice
   * @param payload
   * @private
   */
  private async _loadProductPayloads(
    invoice: Invoice,
    payload: PayloadMap,
  ) {
    const itemsToLoad = Array.from(payload[InvoiceItemType.Product]?.keys() ?? []);
    if (!itemsToLoad.length) return;
    const cached = this._cache[InvoiceItemType.Product];
    const notCached: string[] = []

    itemsToLoad.forEach(uuid => {
      if (!cached?.has(uuid)) {
        this._builderLogger.warn(`Product with UUID ${uuid} not found in cache. Loading from repository...`);
        notCached.push(uuid);
      } else {
        const storedIndex = payload[InvoiceItemType.Product]!.get(uuid);
        if (storedIndex === undefined) return;
        this._builderLogger.warn(`Product with UUID ${uuid} found in cache. Using cached data.`);
        this._putPayload(storedIndex, invoice, cached!.get(uuid) as Product);
      }
    });

    if (!notCached.length) return;

    this._builderLogger.log(`Loading products from repository: ${notCached.join(', ')}`);
    const products = await this._productsRepository.getMany(notCached);

    products.forEach(product => {
      if (!product.uuid) return;
      this._cache.product?.set(product.uuid, product);

      if (payload[InvoiceItemType.Product]?.has(product.uuid)) {
        const storedIndex = payload[InvoiceItemType.Product]!.get(product.uuid);
        if (storedIndex === undefined) return;
        this._putPayload(storedIndex, invoice, product);

      }
    });
  }

  private async _loadOtherPayloads(
    invoice: Invoice,
  ) {
    const systemCredential = invoice.system_credential_id?.uuid;
    const customerCredential = invoice.customer_credential_id?.uuid;

    if (systemCredential) {
      await this._credentialsRepository.getOne(systemCredential).then(credential => {
        if (!credential) {
          return;
        }
        invoice.setCredential(credential);
      });

    }

    if (customerCredential) {
      await this._credentialsRepository.getOne(customerCredential).then(credential => {
        if (!credential) {
          return;
        }
        invoice.setCredential(credential);
      });
    }
  }

  /**
   * Загружает рецепты по их UUID из кеша или репозитория.
   * Рецепты могу содержать в себе как продукты, так и другие рецепты
   * @param invoice
   * @param payload
   * @private
   */
  private async _loadRecipePayloads(
    invoice: Invoice,
    payload: PayloadMap,
  ) {
    // first need to collect all recipes UUIDs and sub-recipe UUIDs
    const itemsToLoad = Array.from(payload[InvoiceItemType.Recipe]?.keys() ?? []);
    if (!itemsToLoad.length) return;
    const cached = this._cache[InvoiceItemType.Recipe] as Map<string, Recipe>;
    const notCached: string[] = []

    itemsToLoad.forEach(uuid => {
      if (!cached?.has(uuid)) {
        notCached.push(uuid);
      } else {
        const storedIndex = payload[InvoiceItemType.Recipe]!.get(uuid);
        if (storedIndex === undefined) return;
        this._putPayload(storedIndex, invoice, cached!.get(uuid)!);
      }
    });

    if (!notCached.length) return;

    const recipes = await this._recipesRepository.getMany(notCached, true);

    recipes.forEach(recipe => {
      if (!recipe.uuid) return;
      this._cache.recipe?.set(recipe.uuid, recipe);

      if (payload[InvoiceItemType.Recipe]?.has(recipe.uuid)) {
        const storedIndex = payload[InvoiceItemType.Recipe]!.get(recipe.uuid);
        if (storedIndex === undefined) return;
        this._putPayload(storedIndex, invoice, recipe);
      }
    });
  }

  /**
   * Устанавливает полезную нагрузку (payload) для позиции в счете-фактуре по индексу.
   * @param index Индекс позиции в счете-фактуре.
   * @param invoice Счет-фактура, в котором нужно установить полезную нагрузку.
   * @param payload Полезная нагрузка, которую нужно установить.
   */
  private _putPayload(
    index: number,
    invoice: Invoice,
    payload: Product | Recipe,
  ) {
    const targetItem = invoice?.rows[index!];
    if (targetItem) {
      targetItem.setPayload(payload);
      this._builderLogger.log(`Payload set for item "${targetItem.type}" with UUID ${targetItem.payloadUUID}:`, payload);
    }
  }

  /**
   * Создает карту для хранения индексов позиций по их UUID. Чтобы быстро находить потом позицию в счете-фактуре по UUID
   */
  private _collectPayloadMap(
    items: InvoiceItemBase[]
  ) {
    return items.reduce((acc: PayloadMap, item: InvoiceItemBase, index) => {
      const uuid = item.payloadUUID;
      if (!uuid) return acc;
      acc[item.type]?.set(uuid, index);
      return acc;
    }, {
      [InvoiceItemType.Product]: new Map(),
      [InvoiceItemType.Recipe]: new Map(),
    } as PayloadMap);
  }
}
