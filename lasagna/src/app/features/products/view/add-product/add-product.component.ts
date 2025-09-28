import {Component, computed, DestroyRef, effect, inject, OnInit, signal, viewChild} from '@angular/core';

import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {AddProductFormComponent} from '../add-product-form/add-product-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {DraftForm} from '../../../../shared/service/services/draft-forms.service';
import {ProductsRepository} from '../../service/products.repository';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {combineLatest, debounceTime, take} from 'rxjs';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {ShrinkDirective} from '../../../../shared/view/directives/shrink.directive';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {CurrencyPipe} from '@angular/common';
import {Product} from '../../service/Product';
import {ProductDTO} from '../../service/Product.scheme';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {ROUTER_MANAGER} from '../../../../shared/service/providers/router-manager.provider';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {ControlsBarComponent} from '../../../../shared/view/ui/controls-bar/controls-bar.component';
import {MatIcon} from '@angular/material/icon';
import {errorHandler} from '../../../../shared/helpers';
import {
  DeleteConfirmationService
} from '../../../../shared/view/ui/delete-confirmation-popover/delete-confirmation.service';
import {
  DeleteConfirmationPopoverComponent
} from '../../../../shared/view/ui/delete-confirmation-popover/delete-confirmation-popover.component';
import {WINDOW} from '../../../../shared/service/tokens/window.token';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'lg-add-product',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    AddProductFormComponent,
    FlexRowComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    TimeAgoPipe,
    TranslatePipe,
    FlexColumnComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    SelfStartDirective,
    ControlsBarComponent,
    MatIcon,
    DeleteConfirmationPopoverComponent,
  ],
  templateUrl: './add-product.component.html',
  styles: [
    `
    `
  ],
  providers: [
    CurrencyPipe,
    DeleteConfirmationService
  ],
})
export class AddProductComponent
  implements OnInit {
  constructor(
    public _router: Router,
    private _aRoute: ActivatedRoute,
    private _productsRepository: ProductsRepository,
    private _notificationsService: NotificationsService,
    private _analyticsService: AnalyticsService,
    private _translateService: TranslateService,
  ) {
  }

  readonly deleteConfirmationService = inject(DeleteConfirmationService);
  draftOrProductUUID = signal<string | undefined>(undefined);
  product = signal<Product | null>(null);
  formComponent = viewChild<AddProductFormComponent | null>(AddProductFormComponent);
  draftRef = signal<DraftForm<ProductDTO> | null>(null);
  draftByExistingProduct = computed(() => {
    return this.draftRef()!.meta?.['uuid'];
  });
  isDraftRoute = signal(false);
  readonly editMode = computed(() => {
    return Boolean((this.product()?.uuid && !this.draftRef())
      || (this.draftRef() && this.draftByExistingProduct()))
  })
  firstState?: any;
  isClient = inject(IS_CLIENT);
  private _routerManager = inject(ROUTER_MANAGER);
  private readonly _window = inject(WINDOW);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _formComponentEffect = effect(() => {
    this.formComponent()?.form.valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed(this._destroyRef),
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

        // if (!this.isDraftRoute()) {
        //   this._routerManager.replace(['products/draft/' + this.draftRef()!.uuid]);
        // }
      }
    });
  })

  ngOnInit() {
    if (!this.isClient) {
      return;
    }
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

  onResetForm() {
    this._removeDraft();
    this._window?.location.reload();
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
    this._routerManager.navigate(['products']);
  }

  onDeleteProduct() {
    if (!this.product()?.uuid) {
      return;
    }


    this.deleteConfirmationService.configure({
      message: this._translateService.instant('product.form.delete-confirm-message'),
      onSuccess: () => {
        this._productsRepository.deleteProduct(this.product()!.uuid!).then(() => {
          this._notificationsService.success('notifications.product.deleted');
          this._routerManager.navigate(['products']);
        }).catch(error => {
          this._notificationsService.error(errorHandler(error));
        });
      },
      onCancel: () => {
      }
    });

  }

  private _addProduct(product: Product) {
    this._productsRepository.addOne(product).then((newUUID) => {
      // Track product creation analytics
      this._analyticsService.trackProductCreated(product.name, {
        product_uuid: newUUID,
        price_per_unit: product.pricePerUnit,
        unit: product.unit,
        category: product.category_id?.name
      });

      this.formComponent()?.resetForm();
      this._notificationsService.success('notifications.product.added');
      this.product.set(null);

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.replace(['products/edit/' + newUUID]);
    }).catch(error => {
      this._notificationsService.error(errorHandler(error));
    });
  }

  private _editProduct(product: Product) {
    if (!this.draftOrProductUUID()) {
      return;
    }
    let productUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrProductUUID();
    this._productsRepository.updateOne(productUUID as string, product).then(() => {
      this.formComponent()?.resetForm(product);
      this._notificationsService.success('notifications.product.edited');

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.replace(['products', 'edit', productUUID]);
    }).catch(error => {
      this._notificationsService.error(errorHandler(error));
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
    }).catch(error => {
      this._notificationsService.error(errorHandler(error));
    });
  }
}
