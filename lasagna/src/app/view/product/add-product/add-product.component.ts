import {AfterViewInit, Component, computed, effect, OnInit, Renderer2, signal, viewChild} from '@angular/core';

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
import {CurrencyPipe} from '@angular/common';
import {Product} from '@service/models/Product';
import {ProductDTO} from '@service/db/shemes/Product.scheme';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TranslatePipe} from '@ngx-translate/core';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {UserCurrencyPipe} from '@view/pipes/userCurrency.pipe';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    AddProductFormComponent,
    GapRowComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    TimeAgoPipe,
    TranslatePipe,
    GapColumnComponent,
    UserCurrencyPipe
  ],
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-gap-column size="medium">
          <lg-gap-row [center]="true" [mobileMode]="true">
            @if ((product()?.uuid && !draftRef()) || (draftRef() && draftByExistingProduct())) {
              <lg-title>
                {{ 'edit-label'|translate }}
                {{ product()?.name }}
              </lg-title>
            } @else {
              <lg-title>
                {{ 'product.form.title'|translate }}
              </lg-title>
            }

            @if (product()?.pricePerUnit) {
              ({{ product()?.perUnitLabel }} {{ product()?.pricePerUnit | userCurrency:'1.0-5' }})
            }
          </lg-gap-row>

          @if (draftRef()) {
            <span>{{ 'saved-draft-label'|translate }}</span>
          }

          @if (product()?.updatedAt) {
            <span> ({{ 'edited-at-label'|translate }} {{ product()?.updatedAt | timeAgo }})</span>
          }

        </lg-gap-column>

        <lg-add-product-form [product]="product()"></lg-add-product-form>

        <lg-gap-row [mobileMode]="true" [relaxed]="true">
          @if ((product() && !draftRef()) || (draftRef() && draftByExistingProduct())) {
            <lg-button [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                       lgShrink
                       (click)="onEditProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
                {{ 'product.form.save-btn.edit.active'|translate }}
              } @else {
                {{ 'product.form.save-btn.edit.disabled'|translate }}
              }
            </lg-button>
          } @else {
            <lg-button lgShrink
                       [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                       (click)="onAddProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
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
  ],
  providers: [
    CurrencyPipe,
  ]
})
export class AddProductComponent
  implements OnInit, AfterViewInit {
  constructor(
    public _router: Router,
    private _aRoute: ActivatedRoute,
    private _productsRepository: ProductsRepository,
    private _notificationsService: NotificationsService,
    private _renderer: Renderer2,
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
  productEffect = effect(() => {
    if (this.product()) {
      this._renderer.setProperty(document.body, 'style', `--background-color: ${this.product()!.ownColor}`);
    } else {
      this._renderer.removeAttribute(document.body, 'style');
    }
  });

  ngOnDestroy() {
    this._renderer.removeAttribute(document.body, 'style');
  }

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
      } else if (this.product()) {
        this.draftRef.set(this._productsRepository.saveDraftProduct(
          this.product()!,
          this.draftOrProductUUID() ?? ''));

        if (!this.isDraftRoute()) {
          window.history.replaceState({}, '', this._router.createUrlTree(['products/draft/' + this.draftRef()!.uuid]).toString());
        }
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
    this._productsRepository.getOne(uuid, true).then(product => {
      if (!product) {
        return;
      }
      this.product.set(product);
    });
  }
}
