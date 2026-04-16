import {Component, computed, DestroyRef, effect, inject, OnInit, signal, viewChild} from '@angular/core';

import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {AddProductFormComponent} from '../add-product-form/add-product-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {DraftForm, NotificationsService} from '../../../../shared/service/services';
import {ProductsRepository} from '../../service/products.repository';
import {combineLatest, debounceTime, take} from 'rxjs';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {ShrinkDirective} from '../../../../shared/view/directives/shrink.directive';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {CurrencyPipe} from '@angular/common';
import {Product} from '../../service/Product';
import {ProductDTO} from '../../service/Product.scheme';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {errorHandler} from '../../../../shared/helpers';
import {ROUTER_MANAGER} from '../../../../shared/service/providers/router-manager.provider';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {ControlsBarComponent} from '../../../../shared/view/ui/controls-bar/controls-bar.component';
import {MatIcon} from '@angular/material/icon';
import {ConfirmationService} from '../../../../shared/view/ui/confirmation-popover/confirmation.service';
import {
  ConfirmationPopoverComponent
} from '../../../../shared/view/ui/confirmation-popover/confirmation-popover.component';
import {WINDOW} from '../../../../shared/service/tokens/window.token';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {OnboardingService} from '../../../onboarding/onboarding.service';
import {SyncBadgeComponent} from '../../../../shared/view/ui/sync/sync-badge.component';

@Component({
  selector: 'lg-add-product',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    AddProductFormComponent,
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
    ConfirmationPopoverComponent,
    InlineSeparatedGroupDirective,
    FlexColumnComponent,
    FlexRowComponent,
    SyncBadgeComponent,
  ],
  templateUrl: './add-product.component.html',
  styles: [
    `
    `
  ],
  providers: [
    CurrencyPipe,
    ConfirmationService
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

  readonly deleteConfirmationService = inject(ConfirmationService);
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
  private readonly _onboardingService = inject(OnboardingService);
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
        this._analyticsService.trackEvent('product_draft_opened', {
          event_category: 'products',
          event_label: 'draft',
        });
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
    this.deleteConfirmationService.configure({
      message: this._translateService.instant('product.form.delete-confirm-message'),
      onSuccess: () => {
        if (!this.product()?.uuid) {
          return;
        }

        this._productsRepository.deleteOne(this.product()!)
          .then(() => {
            this._notificationsService.success('notifications.product.deleted');
            this._routerManager.navigate(['products']);
          })
          .catch(error => {
            this._notificationsService.error(errorHandler(error));
          });
      },
      onCancel: () => {
      }
    });
  }

  private _addProduct(product: Product) {
    this._productsRepository.addOne(product)
      .then(({data, message}) => {
        if (data) {
          // Track product creation analytics
          this._analyticsService.trackProductCreated(product.name, {
            product_uuid: data,
            price_per_unit: product.pricePerUnit,
            unit: product.unit,
            category: product.category_id?.name
          });

          // Онбординг: если это первый продукт, отмечаем шаг завершённым
          if (!this._onboardingService.isProductDone()) {
            this._onboardingService.markProductDone();
          }

          this.formComponent()?.resetForm();
          this._notificationsService.success('notifications.product.added');
          if (message) {
            this._notificationsService.warning(message);
          }
          this.product.set(null);

          if (this.draftRef()) {
            this._removeDraft();
          }

          this._routerManager.replace(['products/edit/' + data.uuid]);
        }

        if (message) {
          this._notificationsService.error(message);
        }
      })
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
      });
  }

  private async _editProduct(product: Product) {
    try {
      if (!this.draftOrProductUUID()) {
        return;
      }
      let productUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrProductUUID();
      const resp = await this._productsRepository.updateOne(productUUID as string, product);

      if (resp.message) {
        this._notificationsService.warning(resp.message);
      }

      if (resp.data) {
        this.formComponent()?.resetForm(product);
        this._notificationsService.success('notifications.product.edited');

        if (this.draftRef()) {
          this._removeDraft();
        }

        this._routerManager.replace(['products', 'edit', productUUID]);
      }
    } catch (error) {
      this._notificationsService.error(errorHandler(error));
    }
  }

  private _removeDraft() {
    if (!this.draftRef()) {
      return;
    }
    this._productsRepository.removeDraftProduct(this.draftRef()!.uuid)
      .then(() => {
        this.draftRef.set(null);
      })
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
      });
  }

  private _loadProduct(uuid?: string) {
    if (!uuid) {
      return;
    }
    this._productsRepository.getOne(uuid, true)
      .then(product => {
        if (!product) {
          return;
        }
        this.product.set(product);
      })
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
      });
  }
}
