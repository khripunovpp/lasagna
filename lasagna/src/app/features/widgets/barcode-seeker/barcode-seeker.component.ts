import {AfterViewInit, Component, computed, input, OnDestroy, output, resource, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {FlexColumnComponent} from '../../../shared/view/ui/layout/flex-column.component';
import {InputComponent} from '../../controls/form/input.component';
import {TitleComponent} from '../../../shared/view/ui/layout/title/title.component';
import {ButtonComponent} from '../../../shared/view/ui/layout/button.component';

import {ExpandDirective} from '../../../shared/view/directives/expand.directive';
import {ParseMathDirective} from '../../../shared/view/directives/parse-math.directive';
import {FlexRowComponent} from '../../../shared/view/ui/layout/flex-row.component';
import {NumberInputComponent} from '../../controls/form/number-input.component';
import {ControlComponent} from '../../controls/form/control-item/control.component';
import {OpenFoodFactsService} from '../../../shared/service/services/openfoodfacts.service';
import {ShrinkDirective} from '../../../shared/view/directives/shrink.directive';
import {BarcodeReaderService} from '../../../shared/service/services/barcode-reader.service';
import {ProductsRepository} from '../../products/service/products.repository';
import {NotificationsService} from '../../../shared/service/services/notifications.service';
import {Product} from '../../products/service/Product';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'lg-barcode-add-product-widget',
  standalone: true,
  templateUrl: './barcode-seeker.component.html',
  imports: [
    FormsModule,
    FlexColumnComponent,
    InputComponent,
    TitleComponent,
    ButtonComponent,
    ExpandDirective,
    ParseMathDirective,
    FlexRowComponent,
    NumberInputComponent,
    ControlComponent,
    ShrinkDirective,
    TranslatePipe
  ],

  styles: [
    `
    `],
  providers: [],
})
export class BarcodeSeekerWidgetComponent
  implements OnDestroy, AfterViewInit {
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
    params: () => ({id: this.barcode()}),
    loader: ({params, abortSignal}): Promise<any> => {
      if (this.lockRequest || !params.id) {
        return Promise.resolve(null);
      }

      this._notificationService.info('Barcode detected: ' + params.id);
      this.lockRequest = true;
      return this._openFoodFactsService.getProductByBarcode(params.id).then(res => {
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

  clear() {
    this.barcode.set('');
    this.product = {
      name: '',
      price: 0,
      amount: 0,
      unit: 'gram' as 'gram' | 'piece'
    };
    this.showProductForm.set(false);
    this.lockRequest = false;
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
    this._productRepository.addOne(Product.fromRaw({
      name: this.product.name,
      price: this.product.price,
      amount: this.product.amount,
      unit: this.product.unit as any,
      source: 'openfoodfacts',
      category_id: '',
      tags: [],
      createdAt: Date.now(),
    })).then((uuid) => {
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

  ngOnDestroy() {
    this.stopCamera();
  }
}
