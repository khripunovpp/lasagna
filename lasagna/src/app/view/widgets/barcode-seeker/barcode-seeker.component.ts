import {Component, computed, EventEmitter, Output, resource, signal} from '@angular/core';
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


@Component({
  selector: 'app-barcode-popup',
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
export class BarcodePopupComponent {
  constructor(
    private _openFoodFactsService: OpenFoodFactsService,
    private _arcodeReaderService: BarcodeReaderService,
  ) {
  }

  @Output() close = new EventEmitter<void>();
  @Output() scanned = new EventEmitter<any>();
  barcode = signal('');
  product = {
    name: '',
    price: 0,
    amount: 0,
    unit: 'gram' as 'gram' | 'piece'
  };

  userResource = resource({
    request: () => ({id: this.barcode()}),
    loader: ({request, abortSignal}): Promise<any> => {
      return this._openFoodFactsService.getProductByBarcode(request.id)
    },
  });
  productResult = computed(() => {
    const resp = this.userResource.value();

    if (resp.status === 1) {
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

  }


  extractAmount(product: any): number {
    if (product.quantity) {
      const match = product.quantity.match(/\d+/);
      return match ? +match[0] : 0;
    }
    return 0;
  }

  detectUnit(product: any): 'gram' | 'piece' {
    const qty = (product.serving_quantity_unit || '').toLowerCase();
    if (qty.includes('g') || qty.includes('ml')) return 'gram';
    if (qty.includes('pc') || qty.includes('шт')) return 'piece';
    return 'gram';
  }

  addProduct() {

  }

  confirm() {
    this.scanned.emit({...this.product, barcode: this.barcode});
    this.close.emit();
  }

  cancel() {
    // this.codeReader.reset();
    this.close.emit();
  }

  async ngAfterViewInit() {
    await this._arcodeReaderService.startCamera(
      'video',
      (result) => {
        console.log({result});

        if (result) {
          this.barcode.set(result);
        }
      }
    );
  }

}
