import {AfterViewInit, Component, computed, OnInit, signal, viewChild} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddProductFormComponent, ProductFormValue} from './add-product-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {FadeInComponent} from '../../ui/fade-in.component';
import {DraftForm} from '../../../service/services/draft-forms.service';
import {Product, ProductDbValue, ProductsRepository} from '../../../service/repositories/products.repository';
import {NotificationsService} from '../../../service/services/notifications.service';
import {flaterizeObjectWithUuid} from '../../../helpers/attribute.helper';
import {debounceTime} from 'rxjs';

import {ButtonComponent} from '../../ui/layout/button.component';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {DatePipe} from '@angular/common';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';


@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddProductFormComponent,
    GapRowComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    DatePipe,
    TimeAgoPipe
  ],
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  @if ((product() && !draftRef()) || (draftRef() && draftByExistingProduct())) {
                      <lg-title>Edit Product</lg-title>
                      @if (product()?.updatedAt) {
                          (last edited {{ product()?.updatedAt | timeAgo }})
                      }
                  } @else {
                      <lg-title>Add Product</lg-title>
                  }
                  @if (draftRef()) {
                      (saved as draft)
                  }
              </lg-gap-row>

              <lg-card>
                  <lg-add-product-form [product]="product()"></lg-add-product-form>
              </lg-card>

              <lg-gap-row [mobileMode]="true" [relaxed]="true">
                  @if ((product() && !draftRef()) || (draftRef() && draftByExistingProduct())) {
                      <lg-button lgShrink (click)="onEditProduct()">
                          Edit Product
                      </lg-button>
                  } @else {
                      <lg-button lgShrink (click)="onAddProduct()">
                          Add Product
                      </lg-button>
                  }

                  @if (isDraftRoute()) {
                      <lg-button lgShrink [style]="'danger'"
                                 (click)="onRemoveDraft()">
                          Delete this draft
                      </lg-button>
                  }
              </lg-gap-row>
          </lg-container>
      </lg-fade-in>
  `,
  styles: [
    `
    `
  ]
})
export class AddProductComponent
  implements OnInit, AfterViewInit {
  constructor(
    public _router: Router,
    private _aRoute: ActivatedRoute,
    private _productsRepository: ProductsRepository,
    private _notificationsService: NotificationsService,
  ) {
  }

  draftOrProductUUID = signal<string | undefined>(undefined);
  product = signal<Product | null>(null);
  formComponent = viewChild<AddProductFormComponent | null>(AddProductFormComponent);
  draftRef = signal<DraftForm<ProductFormValue> | null>(null);
  draftByExistingProduct = computed(() => {
    return this.draftRef()!.meta?.['uuid'];
  });
  isDraftRoute = signal(false);

  ngOnInit() {
    this._aRoute.params.subscribe(params => {
      this.draftOrProductUUID.set(params['uuid']);
      this._loadProduct(this.draftOrProductUUID());
    });

    this._aRoute.data.subscribe(data => {
      if (data['draft']) {
        this.draftRef.set(data['draft']);
        this.product.set(data['draft'].data);
      }
      this.isDraftRoute.set(!!data['draftRoute']);
    });
  }

  ngAfterViewInit() {

    this.formComponent()?.form.valueChanges.pipe(
      debounceTime(500),
    ).subscribe((value) => {
      if (!this.formComponent()!.form.dirty) {
        return
      }

      if (this.draftRef()?.uuid) {
        this._productsRepository.updateDraftProduct(
          this.draftRef()!.uuid,
          value as ProductFormValue,
          this.draftRef()!.meta?.['uuid']
        );
      } else {
        this.draftRef.set(this._productsRepository.saveDraftProduct(
          value as ProductFormValue,
          this.draftOrProductUUID() ?? ''));
      }
    });
  }

  onAddProduct() {
    if (!this.formComponent()?.validateForm()) {
      return;
    }
    this._addProduct(this.formComponent()!.value);
  }

  onEditProduct() {
    if (!this.formComponent()?.validateForm()) {
      return;
    }
    this._editProduct(this.formComponent()!.value);
  }

  onRemoveDraft() {
    this._removeDraft();
    this._router.navigate(['products']);
  }

  private _addProduct(product: ProductFormValue) {
    this._productsRepository.addProduct(flaterizeObjectWithUuid<ProductDbValue>(product)).then(() => {
      this.formComponent()?.resetForm();
      this._notificationsService.success('Product added');

      if (this.draftRef()) {
        this._removeDraft();
      }

      if (this.isDraftRoute()) {
        this._router.navigate(['products']);
      }
    });
  }

  private _editProduct(product: ProductFormValue) {
    if (!this.draftOrProductUUID()) {
      return;
    }
    let productUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrProductUUID();
    this._productsRepository.editProduct(productUUID as string, flaterizeObjectWithUuid<ProductDbValue>(product)).then(() => {
      this.formComponent()?.resetForm(product);
      this._notificationsService.success('Product edited');

      if (this.draftRef()) {
        this._removeDraft();
      }

      if (this.isDraftRoute()) {
        this._router.navigate(['products', 'edit', productUUID]);
      }
    });
  }

  private _removeDraft() {
    if (!this.draftRef()) {
      return;
    }
    this._productsRepository.removeDraftProduct(this.draftRef()!.uuid)
    this.draftRef.set(null);
  }

  private _loadProduct(uuid?: string) {
    if (!uuid) {
      return;
    }
    this._productsRepository.getOne(uuid).then(product => {
      if (!product) {
        return;
      }
      this.product.set(product);
    });
  }
}
