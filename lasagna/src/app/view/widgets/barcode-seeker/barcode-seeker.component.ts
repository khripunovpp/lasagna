import {Component, computed, input, output, resource, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DecimalPipe, NgIf} from '@angular/common';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {InputComponent} from '../../ui/form/input.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {ControlsRowComponent} from '../../ui/form/controls-row.component';
import {ExpandDirective} from '../../directives/expand.directive';
import {ParseMathDirective} from '../../directives/parse-math.directive';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {NumberInputComponent} from '../../ui/form/number-input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {OpenFoodFactsService} from '../../../service/services/openfoodfacts.service';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {BarcodeReaderService} from '../../../service/services/barcode-reader.service';
import {ProductsRepository} from '../../../service/repositories/products.repository';
import {NotificationsService} from '../../../service/services/notifications.service';


@Component({
  selector: 'lg-barcode-add-product-widget',
  standalone: true,
  templateUrl: './barcode-seeker.component.html',
  imports: [

    FormsModule,
    NgIf,
    DecimalPipe,
    GapColumnComponent,
    InputComponent,
    TitleComponent,
    ButtonComponent,
    ControlsRowComponent,
    ExpandDirective,
    ParseMathDirective,
    GapRowComponent,
    NumberInputComponent,
    ControlComponent,
    ShrinkDirective,
  ],

  styles: [
    `
    `],
  providers: [],
})
export class BarcodeSeekerWidgetComponent {
  constructor(
    private _openFoodFactsService: OpenFoodFactsService,
    private _arcodeReaderService: BarcodeReaderService,
    private _productRepository: ProductsRepository,
    private _notificationService: NotificationsService,
  ) {
  }

  productAdded = output<{
    uuid: string
    name: string
  }>();
  barcode = signal('');
  product = {
    name: '',
    price: 0,
    amount: 0,
    unit: 'gram' as 'gram' | 'piece'
  };
  lockRequest = false;
  showFormInitially = input(false);
  showScanerInitially = input(false);
  showScanner = signal(false);
  showProductForm = signal(false);

  userResource = resource({
    request: () => ({id: this.barcode()}),
    loader: ({request, abortSignal}): Promise<any> => {
      if (this.lockRequest || !request.id) {
        return Promise.resolve(null);
      }

      this._notificationService.info('Barcode detected: ' + request.id);
      this.lockRequest = true;
      return this._openFoodFactsService.getProductByBarcode(request.id).then(res => {
        this.showProductForm.set(true);
        return res;
      });
    },
  });
  productResult = computed(() => {
    const resp = this.userResource.value();

    if (resp?.status === 1) {
      const product = resp.product;
      this.product.name = (product.product_name || '') + ' (' + (product.brands || '') + ')';
      this.product.amount = this.extractAmount(product);
      this.product.unit = this.detectUnit(product);
      return {
        ...this.product,
      }
    }

    return null
  })

  onBarcodeManualInput() {
    this.lockRequest = false;
  }

  openScanner() {
    this.showScanner.set(true);
    this.startCamera();
  }

  closeScanner() {
    this.showScanner.set(false);
    this.stopCamera();
  }

  extractAmount(product: any): number {
    if (product.quantity) {
      const match = product.quantity.match(/\d+/);
      return match ? +match[0] : 0;
    }
    return 0;
  }

  stopCamera() {
    this._arcodeReaderService.stopCamera();
  }

  detectUnit(product: any): 'gram' | 'piece' {
    const qty = (product.serving_quantity_unit || '').toLowerCase();
    if (qty.includes('g') || qty.includes('ml')) return 'gram';
    if (qty.includes('pc') || qty.includes('шт')) return 'piece';
    return 'gram';
  }

  addProduct() {
    this._productRepository.addProduct({
      name: this.product.name,
      price: this.product.price,
      amount: this.product.amount,
      unit: this.product.unit as any,
      source: 'openfoodfacts',
      category_id: null,
    }).then((uuid) => {
      this.productAdded.emit({
        uuid: uuid,
        name: this.product.name,
      });
      this.product = {
        name: '',
        price: 0,
        amount: 0,
        unit: 'gram' as 'gram' | 'piece'
      };
      this.barcode.set('');
      this.lockRequest = false;
    });
  }

  startCamera() {
    return this._arcodeReaderService.startCamera(
      'video',
      (result) => {
        console.log({result});
        if (result) {
          this.barcode.set(result);
        }
      }
    );
  }

  async ngAfterViewInit() {
    if (this.showScanerInitially()) {
      this.showScanner.set(true);
      await this.startCamera();
    }
  }
}
