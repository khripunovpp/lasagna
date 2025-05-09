import {AfterViewInit, Component, computed, OnInit, signal, viewChild} from '@angular/core';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddProductFormComponent} from './add-product-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {FadeInComponent} from '../../ui/fade-in.component';
import {DraftForm} from '@service/services/draft-forms.service';
import {ProductsRepository} from '@service/repositories/products.repository';
import {NotificationsService} from '@service/services/notifications.service';
import {combineLatest, debounceTime, take} from 'rxjs';
import {ButtonComponent} from '../../ui/layout/button.component';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {DecimalPipe} from '@angular/common';
import {Product} from '@service/models/Product';
import {ProductDTO} from '@service/db/shemes/Product.scheme';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TranslatePipe} from '@ngx-translate/core';

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
    TimeAgoPipe,
    DecimalPipe,
    TranslatePipe
  ],
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  @if ((product()?.uuid && !draftRef()) || (draftRef() && draftByExistingProduct())) {
                      <lg-title>
                          {{ 'edit-label'|translate }}
                          <span [style.color]="product()?.ownColor">
                              {{ product()?.name }}
                          </span>
                      </lg-title>
                  } @else {
                      <lg-title>
                          {{ 'product.form.title'|translate }}
                      </lg-title>
                  }
                  @if (draftRef()) {
                      {{ 'saved-draft-label'|translate }}
                  }
              </lg-gap-row>

              <div>
                  @if (product()?.updatedAt) {
                      ({{ 'edited-at-label'|translate }} {{ product()?.updatedAt | timeAgo }})
                  }

                  @if (product()?.pricePerUnit) {
                      ({{ product()?.perUnitLabel }} {{ product()?.pricePerUnit | number: '1.2-5' }})
                  }
              </div>

              <lg-card>
                  <lg-add-product-form [product]="product()"></lg-add-product-form>
              </lg-card>

              <lg-gap-row [mobileMode]="true" [relaxed]="true">
                  @if ((product() && !draftRef()) || (draftRef() && draftByExistingProduct())) {
                      <lg-button [disabled]="!formComponent()?.form?.dirty"
                                 lgShrink
                                 (click)="onEditProduct()">
                          @if (formComponent()?.form?.dirty) {
                              {{ 'product.form.save-btn.edit.active'|translate }}
                          } @else {
                              {{ 'product.form.save-btn.edit.disabled'|translate }}
                          }
                      </lg-button>
                  } @else {
                      <lg-button lgShrink
                                 [disabled]="!formComponent()?.form?.dirty"
                                 (click)="onAddProduct()">
                          @if (formComponent()?.form?.dirty) {
                              {{ 'product.form.save-btn.add.active'|translate }}
                          } @else {
                              {{ 'product.form.save-btn.add.disabled'|translate }}
                          }
                      </lg-button>
                  }

                  @if (isDraftRoute()) {
                      <lg-button lgShrink [style]="'danger'"
                                 (click)="onRemoveDraft()">
                          {{ 'product.form.delete-draft-btn'|translate }}
                      </lg-button>
                  } @else if (product()?.uuid) {
                      <lg-button lgShrink [style]="'danger'"
                                 (click)="onDeleteProduct()">
                          {{ 'product.form.delete-btn'|translate }}
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
  draftRef = signal<DraftForm<ProductDTO> | null>(null);
  draftByExistingProduct = computed(() => {
    return this.draftRef()!.meta?.['uuid'];
  });
  isDraftRoute = signal(false);

  ngOnInit() {
    combineLatest([
      this._aRoute.params,
      this._aRoute.data,
    ]).pipe(take(1)).subscribe(([params, data]) => {
      this.draftOrProductUUID.set(params['uuid']);
      if (data['draft']) {
        this.draftRef.set(data['draft']);
        this.product.set(Product.fromRaw(data['draft'].data));
      } else if (this.draftOrProductUUID()) {
        this._loadProduct(this.draftOrProductUUID());
      } else {
        this.product.set(Product.empty());
      }
      this.isDraftRoute.set(!!data['draftRoute']);
    });
  }

  ngAfterViewInit() {

    this.formComponent()?.form.valueChanges.pipe(
      debounceTime(500),
    ).subscribe((value) => {
      if (!this.formComponent()!.form.dirty || !this.product()) {
        return
      }

      if (this.draftRef()?.uuid) {
        this._productsRepository.updateDraftProduct(
          this.draftRef()!.uuid,
          this.product()!,
          this.draftRef()!.meta?.['uuid']
        );
      } else {
        this.draftRef.set(this._productsRepository.saveDraftProduct(
          this.product()!,
          this.draftOrProductUUID() ?? ''));
      }
    });
  }

  onAddProduct() {
    if (!this.formComponent()?.validateForm()
      || !this.product()) {
      return;
    }
    this._addProduct(this.product()!);
  }

  onEditProduct() {
    if (!this.formComponent()?.validateForm()
      || !this.product()) {
      return;
    }
    this._editProduct(this.product()!);
  }

  onRemoveDraft() {
    this._removeDraft();
    this._router.navigate(['products']);
  }

  onDeleteProduct() {
    if (!this.product()?.uuid) {
      return;
    }
    this._productsRepository.deleteProduct(this.product()!.uuid!).then(() => {
      this._notificationsService.success('Product deleted');
      this._router.navigate(['products']);
    });
  }

  private _addProduct(product: Product) {
    this._productsRepository.addOne(product).then(() => {

      this.formComponent()?.resetForm();
      this._notificationsService.success('Product added');
      this.product.set(null);

      if (this.draftRef()) {
        this._removeDraft();
      }

      if (this.isDraftRoute()) {
        this._router.navigate(['products']);
      }
    });
  }

  private _editProduct(product: Product) {
    if (!this.draftOrProductUUID()) {
      return;
    }
    let productUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrProductUUID();
    this._productsRepository.updateOne(productUUID as string, product).then(() => {
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
