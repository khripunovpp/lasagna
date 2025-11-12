import {AfterViewInit, Component, computed, inject, OnInit, Renderer2, signal, viewChild} from '@angular/core';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {AddProductFormComponent} from './add-product-form.component';
import {ActivatedRoute, Router} from '@angular/router';
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
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {CloudSyncService} from '../../../api/cloud-sync.service';
import {errorHandler} from '../../../../shared/helpers';
import {ROUTER_MANAGER} from '../../../../shared/service/providers/router-manager.provider';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {ControlsBarComponent} from '../../../../shared/view/ui/controls-bar/controls-bar.component';
import {MatIcon} from '@angular/material/icon';
import {
  DeleteConfirmationService
} from '../../../../shared/view/ui/delete-confirmation-popover/delete-confirmation.service';
import {
  DeleteConfirmationPopoverComponent
} from '../../../../shared/view/ui/delete-confirmation-popover/delete-confirmation-popover.component';
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
    DeleteConfirmationPopoverComponent,
    InlineSeparatedGroupDirective,
    FlexColumnComponent,
    FlexRowComponent,
    SyncBadgeComponent,
  ],
  template: `
    @if (editMode()) {
      <lg-controls-bar size="small">
        <lg-button [icon]="true"
                   [link]="'/products/add'"
                   [size]="'small'"
                   [label]=" 'product.form.add-new-btn'|translate"
                   [style]="'primary'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>
      </lg-controls-bar>
    }

    <lg-fade-in>
      <lg-container>
        <lg-flex-column size="medium">
          <lg-flex-row [center]="true">
            @if ((product()?.uuid && !draftRef()) || (draftRef() && draftByExistingProduct())) {
              <lg-title lgSelfStart>
                {{ product()?.name }}
              </lg-title>

               <lg-sync-badge [entity]="product()!"></lg-sync-badge>
            } @else {
              <lg-title lgSelfStart>
                {{ 'product.form.title'|translate }}
              </lg-title>
            }
          </lg-flex-row>

          <lg-inline-separated-group>
            @if (draftRef() && formComponent()?.form?.dirty) {
              <ng-template lgInlineSeparatedGroup>
                <lg-fade-in>
                  <span class="text-success">{{ 'saved-draft-label'|translate }}</span>
                </lg-fade-in>
              </ng-template>
            }

            @if (isDraftRoute()) {
              <ng-template lgInlineSeparatedGroup>
                <lg-button lgShrink [style]="'danger'"
                           [flat]="true"
                           (click)="onRemoveDraft()">
                  {{ 'product.form.delete-draft-btn'|translate }}
                </lg-button>
              </ng-template>
            } @else if (product()?.uuid && !product()?.deleted) {
              <ng-template lgInlineSeparatedGroup>
                <lg-button lgShrink [style]="'danger'"
                           [flat]="true"
                           (click)="onDeleteProduct()">
                  {{ 'product.form.delete-btn'|translate }}
                </lg-button>
              </ng-template>
            }
          </lg-inline-separated-group>

          @if (editMode() && product()?.updatedAt) {
            <small class="text-muted text-cursive">
              {{ 'edited-at-label'|translate }} {{ product()?.updatedAt | timeAgo }}
            </small>
          }

        </lg-flex-column>

        <!--        @if (product()?.uuid) {-->
        <!--          <lg-sync-single-button (onClick)="sync()"-->
        <!--                                 [needSync]="!!product()?.needSync()"></lg-sync-single-button>-->
        <!--        }-->

        <lg-add-product-form [editMode]="editMode()"
                             [product]="product()"></lg-add-product-form>

        <lg-flex-row [mobileMode]="true" [relaxed]="true">
          @if ((product() && !draftRef()) || (draftRef() && draftByExistingProduct())) {
            <lg-button [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                       lgShrink
                       [style]="'primary'"
                       (click)="onEditProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
                {{ 'product.form.save-btn.edit.active'|translate }}
              } @else {
                {{ 'product.form.save-btn.edit.disabled'|translate }}
              }
            </lg-button>
          } @else {
            <lg-button lgShrink
                       [style]="'primary'"
                       [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                       (click)="onAddProduct()">
              @if (formComponent()?.form?.dirty || draftRef()) {
                {{ 'product.form.save-btn.add.active'|translate }}
              } @else {
                {{ 'product.form.save-btn.add.disabled'|translate }}
              }
            </lg-button>
          }

          @if (formComponent()?.form?.dirty) {
            <lg-button (click)="onResetForm()"
                       [outlined]="true"
                       [style]="'primary'"
                       lgShrink>
              {{ 'product.form.reset-btn.edit.active'|translate }}
            </lg-button>
          }
        </lg-flex-row>
      </lg-container>
    </lg-fade-in>

    <lg-delete-confirmation-popover></lg-delete-confirmation-popover>
  `,
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
  implements OnInit, AfterViewInit {
  constructor(
    public _router: Router,
    private _aRoute: ActivatedRoute,
    private _productsRepository: ProductsRepository,
    private _notificationsService: NotificationsService,
    private _analyticsService: AnalyticsService,
    private _translateService: TranslateService,
    private _renderer: Renderer2,
    private _cloudSyncService: CloudSyncService,
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
  private _routerManager = inject(ROUTER_MANAGER);
  private _onboardingService = inject(OnboardingService);

  ngOnDestroy() {
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

        // if (!this.isDraftRoute()) {
        //   this._routerManager.replace(['products/draft/' + this.draftRef()!.uuid]);
        // }
      }
    });
  }

  onResetForm() {
    this._removeDraft();
    window.location.reload();
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

        this._productsRepository.deleteOne(this.product()!).then(() => {
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

          this._routerManager.replace(['products/edit/' + data]);
        }

        if (message) {
          this._notificationsService.error(message);
        }
      }).catch(error => {
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

      if (resp.data) {
        this.formComponent()?.resetForm(product);
        this._notificationsService.success('notifications.product.edited');

        if (this.draftRef()) {
          this._removeDraft();
        }

        this._routerManager.replace(['products', 'edit', productUUID]);
      }

      if (resp.message) {
        this._notificationsService.warning(resp.message);
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
