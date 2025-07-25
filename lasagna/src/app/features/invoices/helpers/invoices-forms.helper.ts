import {InferFormShape} from '../../../shared/types/forms.types';
import {InvoiceDTO} from '../service/Inovice/Invoice.scheme';
import {InvoiceItemDTO} from '../service/InvoiceItem/InvoiceItem.scheme';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Invoice} from '../service/Inovice/Invoice';
import {InvoiceItemBase} from '../service/InvoiceItem/InvoiceItemBase.abstract';
import {ProductInvoiceItem} from '../service/InvoiceItem/ProductInvoiceItem.model';
import {RecipeInvoiceItem} from '@invoices/service/InvoiceItem/RecipeInvoiceItem.model';
import {Credential} from '../../settings/service/models/Credential';

export const invoiceItemFormShape = {
  amount: new FormControl<string | null>(null, Validators.required),
  unit: new FormControl<string>('gram', Validators.required),
  activeTab: new FormControl<'recipe' | 'product' | 'custom'>('recipe'),
  recipe_id: new FormControl<{
    uuid: string
  } | null>(null),
  product_id: new FormControl<{
    uuid: string
  } | null>(null),
  pricePerUnit: new FormControl<string | null>(null),
  totalPrice: new FormControl<string | null>(null),
  totalPriceWithTaxesAndFees: new FormControl<string | null>(null),
};

export const invoiceTaxItemFormShape = {
  name: new FormControl<string>('', Validators.required),
  amount: new FormControl<number | string>(0, Validators.required),
  percentage: new FormControl<boolean>(true, Validators.required),
  description: new FormControl<string | null>(''),
  items: new FormControl<string[]>([]),
  uuid: new FormControl<string | null>(null),
}

export const invoiceFormShape = {
  name: new FormControl<string>('', Validators.required),
  rows: new FormArray([
    new FormGroup(invoiceItemFormShape),
  ]),
  credential_from: new FormControl<{
    free_style?: string
    id?: Credential
  }>({free_style: undefined, id: undefined}),
  credential_to: new FormControl<{
    free_style?: string
    id?: Credential
  }>({free_style: undefined, id: undefined}),
  date_issued: new FormControl<number | string | null>(null),
  date_due: new FormControl<number | string | null>(null),
  notes: new FormControl<string | null>(''),
  terms: new FormControl<string | null>(''),
  invoice_number: new FormControl<string>(''),
  prefix: new FormControl<string>(''),
  taxes_and_fees: new FormControl([]),
  taxesIncluded: new FormControl<boolean>(false),
};

export const makeInvoiceItemFormGroup = (
  item?: InvoiceItemBase,
  invoice?: Invoice
): FormGroup => {
  let productId = null;
  let recipeId = null;
  if (item && item instanceof ProductInvoiceItem && item.product?.uuid) {
    productId = {uuid: item.product.uuid};
  }
  if (item && item instanceof RecipeInvoiceItem && item.recipe?.uuid) {
    recipeId = {uuid: item.recipe.uuid};
  }

  const totalPriceWithTaxesAndFees = (((item?.totalPrice || 0) + (item?.calculateTaxesAndFeesAmount(invoice?.taxesAndFees || []) || 0)) || 0) || null;

  return new FormGroup({
    amount: new FormControl(item?.amount || null, Validators.required),
    unit: new FormControl(item?.unit ?? 'gram', Validators.required),
    activeTab: new FormControl(item?.type || 'recipe'),
    recipe_id: new FormControl(recipeId),
    product_id: new FormControl(productId),
    totalPrice: new FormControl(item?.totalPrice),
    pricePerUnit: new FormControl(item?.pricePerUnitModified),
    totalPriceWithTaxesAndFees: new FormControl(totalPriceWithTaxesAndFees),
  })
}

export const fromFormToDTO = (
  formValue: InferFormShape<typeof invoiceFormShape>
): Partial<InvoiceDTO> => {
  return {
    name: formValue.name || '',
    rows: formValue.rows?.map((item) => {
      return {
        amount: parseFloat(item.amount || '0'),
        unit: item.unit || 'gram',
        type: (item.activeTab || 'recipe') as InvoiceItemDTO['type'],
        recipe_id: item.recipe_id?.uuid || null,
        product_id: item.product_id?.uuid || null,
      }
    }),
    credential_from_string: formValue.credential_from?.free_style || '',
    credential_to_string: formValue.credential_to?.free_style || '',
    system_credential_id: formValue.credential_from?.id?.uuid || null,
    customer_credential_id: formValue.credential_to?.id?.uuid || null,
    date_issued: formValue.date_issued,
    date_due: formValue.date_due,
    notes: formValue.notes || '',
    terms: formValue.terms || '',
    invoice_number: formValue.invoice_number || '',
    prefix: formValue.prefix || '',
    taxes_and_fees: formValue.taxes_and_fees as any,
    taxesIncluded: formValue.taxesIncluded || false,
  };
}

export const fromInvoiceToFormValue = (
  invoice: Invoice
): InferFormShape<typeof invoiceFormShape> => {
  return {
    name: invoice.name,
    rows: invoice.rows.map(item => {
      let productId = null;
      let recipeId = null;
      if (invoiceItemIsProduct(item) && item.product?.uuid) {
        productId = {uuid: item.product.uuid};
      }
      if (invoiceItemIsRecipe(item) && item.recipe?.uuid) {
        recipeId = {uuid: item.recipe.uuid};
      }

      return {
        amount: item.amount?.toString() || null,
        unit: item.unit || 'gram',
        activeTab: item.type as 'recipe' | 'product' | 'custom',
        product_id: productId,
        recipe_id: recipeId,
        totalPrice: item.totalPrice.toString(),
        pricePerUnit: item.pricePerUnitModified.toString(),
        totalPriceWithTaxesAndFees: (
          (item.totalPrice || 0) + (item.calculateTaxesAndFeesAmount(invoice.taxesAndFees || []) || 0)
        ).toString(),
      }
    }),
    credential_from: invoice.canBeUpdated ? {
      free_style: invoice.credential_from_string || '',
      id: invoice.system_credential_id
        ? Credential.fromRaw(invoice.system_credential_id)
        : undefined,
    } : {
      free_style: invoice.pinnedDto?.system_credential_string || '',
      id: undefined,
    },
    credential_to: invoice.canBeUpdated ? {
      free_style: invoice.credential_to_string || '',
      id: invoice.customer_credential_id
        ? Credential.fromRaw(invoice.customer_credential_id)
        : undefined,
    } : {
      free_style: invoice.pinnedDto?.customer_credential_string || '',
      id: undefined,
    },
    date_issued: invoice.date_issued ? new Date(invoice.date_issued).toISOString() : null,
    date_due: invoice.date_due ? new Date(invoice.date_due).toISOString() : null,
    notes: invoice.notes || '',
    terms: invoice.terms || '',
    invoice_number: invoice.invoice_number || '',
    prefix: invoice.prefix || '',
    taxes_and_fees: invoice.taxesAndFees as any,
    taxesIncluded: invoice.taxesAlreadyIncluded || false,
  };
};

export const invoiceItemIsProduct = (item: InvoiceItemBase): item is ProductInvoiceItem => {
  return item.type === 'product';
}
export const invoiceItemIsRecipe = (item: InvoiceItemBase): item is RecipeInvoiceItem => {
  return item.type === 'recipe';
}

export const makeCompareKey = {
  forProductModel: (item: ProductInvoiceItem): string => {
    return `product-${item.product.uuid}`;
  },
  forProductDTO: (item: InvoiceItemDTO): string => {
    return `product-${item.product_id}`;
  },
  forRecipeModel: (item: RecipeInvoiceItem): string => {
    return `recipe-${item.recipe?.uuid}`;
  },
  forRecipeDTO: (item: InvoiceItemDTO): string => {
    return `recipe-${item.recipe_id}`;
  },
}
