import {Component, computed, signal, viewChild} from '@angular/core';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {AddInvoiceFormComponent} from './add-invoice-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {NotificationsService} from '../../../../shared/service/services';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {ShrinkDirective} from '../../../../shared/view/directives/shrink.directive';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {CurrencyPipe, NgClass} from '@angular/common';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {InvoiceBuilderService} from '../invoice-builder.service';
import {LoggerService} from '../../../logger/logger.service';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {InvoicesRepository} from '../../service/Invoices.repository';
import {errorHandler} from '../../../../shared/helpers';
import {BrowserTabTrackingService} from '../../../../shared/service/services/browser-tab-tracking.service';
import {stateToBadgeClassMap, stateToLabelMap} from '../../../../shared/service/const/badges.const';
import {InvoiceState} from '@invoices/service/Inovice/InvoiceState';
import {PullDirective} from '../../../../shared/view/directives/pull.directive';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';


@Component({
  selector: 'lg-add-invoice',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    FlexRowComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    TimeAgoPipe,
    TranslatePipe,
    FlexColumnComponent,
    AddInvoiceFormComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    NgClass,
    PullDirective,
    SelfStartDirective,
  ],
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-column size="medium">
          <lg-flex-row [center]="true"
                       [mobileMode]="true"
                       [mobileReverse]="true">
            @if (currentInvoice()?.uuid) {
              <lg-title lgSelfStart>
                {{ currentInvoice()?.name }}
              </lg-title>
            } @else {
              <lg-title lgSelfStart>
                {{ 'invoices.new-invoice' | translate }}
              </lg-title>
            }

            <span [ngClass]="stateBadgeClass()" lgSelfStart>
                {{ stateLabel() }}
              </span>


            <lg-inline-separated-group lgPull lgShrink>
              @if (currentInvoice()?.canMarkPaid) {
                <ng-template lgInlineSeparatedGroup>
                  <lg-button (click)="changeState('paid')"
                             [flat]="true"
                             [style]="'success'"
                             lgShrink>
                    {{ 'invoices.mark-as-paid' | translate }}
                  </lg-button>
                </ng-template>
              }

              @if (currentInvoice()?.canCancel) {
                <ng-template lgInlineSeparatedGroup>
                  <lg-button (click)="changeState('cancelled')"
                             [flat]="true"
                             [style]="'danger'"
                             lgShrink>
                    {{ 'invoices.mark-as-canceled' | translate }}
                  </lg-button>
                </ng-template>
              }
            </lg-inline-separated-group>
          </lg-flex-row>


          <lg-inline-separated-group>
            <ng-template lgInlineSeparatedGroup>
              <lg-button (onClick)="generatePDF()"
                         [disabled]="!!currentInvoice()?.canBeUpdated"
                         [flat]="true"
                         [style]="'success'"
                         lgShrink>
                {{ 'invoices.generate-pdf' | translate }}
              </lg-button>
            </ng-template>

            @if (currentInvoice()?.canCopy) {
              <ng-template lgInlineSeparatedGroup>
                <lg-button (onClick)="copyInvoice()"
                           [flat]="true"
                           [style]="'warning'"
                           lgShrink>
                  {{ 'invoices.copy' | translate }}
                </lg-button>
              </ng-template>
            }

            <ng-template lgInlineSeparatedGroup>
              <lg-button (onClick)="onDeleteInvoice()" [flat]="true"
                         [style]="'danger'"
                         lgShrink>
                {{ 'invoices.delete' | translate }}
              </lg-button>
            </ng-template>
          </lg-inline-separated-group>

          @if (currentInvoice()?.updatedAt) {
            <small class="text-muted text-cursive">
              {{ 'edited-at-label'|translate }} {{ currentInvoice()?.updatedAt | timeAgo }}
            </small>
          }
        </lg-flex-column>

        <lg-add-invoice-form #formComponent></lg-add-invoice-form>

        @if (currentInvoice()?.canBeUpdated) {
          <lg-flex-row [mobileMode]="true"
                       [relaxed]="true">
            <lg-button (click)="editInvoice()"
                       [disabled]="!formComponent?.form?.dirty || !currentInvoice()?.canBeUpdated"
                       [style]="'primary'"
                       [outlined]="!!currentInvoice()?.canIssue"
                       lgShrink>
              @if (formComponent?.form?.dirty && currentInvoice()?.canBeUpdated) {
                {{ 'invoices.save-changes' | translate }}
              } @else {
                {{ 'invoices.nothing-to-save' | translate }}
              }
            </lg-button>

            @if (currentInvoice()?.canIssue) {
              <lg-button (click)="issueInvoice()"
                         [style]="'primary'"
                         lgShrink>
                {{ 'invoices.issue-and-download' | translate }}
              </lg-button>
            }
          </lg-flex-row>
        }
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
export class AddInvoiceComponent {
  constructor(
    public invoiceBuilderService: InvoiceBuilderService,
    public router: Router,
    private _aRoute: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _loggerService: LoggerService,
    private _invoicesRepository: InvoicesRepository,
    private _browserTabTrackingService: BrowserTabTrackingService,
    private _translateService: TranslateService,
    private _analyticsService: AnalyticsService,
  ) {
  }

  uuid = signal<string | undefined>(undefined);
  formComponent = viewChild('formComponent', {read: AddInvoiceFormComponent});
  currentInvoice = computed(() => this.invoiceBuilderService.invoice());
  stateLabel = computed(() => {
    if (!this.currentInvoice()) {
      return this._translateService.instant('invoices.state.unknown');
    }
    const state = this.currentInvoice()!.state;
    const key = stateToLabelMap[state];
    return key ? this._translateService.instant(key) : this._translateService.instant('invoices.state.unknown');
  });
  stateBadgeClass = computed(() => {
    if (!this.currentInvoice()) {
      return stateToBadgeClassMap['draft'];
    }
    const state = this.currentInvoice()!.state;
    return stateToBadgeClassMap[state || 'draft'];
  });

  onDeleteInvoice() {
    if (!this.currentInvoice()?.uuid) {
      return;
    }
    this._invoicesRepository.deleteOne(this.currentInvoice()!.uuid!).then(() => {
      this._notificationsService.success('invoices.deleted');
      this.router.navigate(['invoices']);
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }

  generatePDF() {
    if (!this.currentInvoice()?.uuid) {
      return;
    }
    this._invoicesRepository.generatePdf(this.currentInvoice()!);
  }

  copyInvoice() {
    if (!this.currentInvoice()?.uuid) {
      return;
    }
    this._invoicesRepository.createCopy(this.currentInvoice()!).then((newUUID) => {
      this._notificationsService.success('invoices.copied');
      this.router.navigate(['invoices', 'edit', newUUID]).then(() => {
        window.location.reload();
      })
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }

  changeState(state: string) {
    switch (state as InvoiceState) {
      case 'draft':
        this.invoiceBuilderService.markAsDraft();
        break;
      case 'paid':
        this.invoiceBuilderService.markPaid();
        break;
      case 'cancelled':
        this.invoiceBuilderService.markAsCanceled();
        break;
      case 'issued':
        this.invoiceBuilderService.issueInvoice();
        break;
      default:
        this._loggerService.error('Unknown state', state);
        return;
    }

    this.editInvoice();
  }

  editInvoice() {
    if (!this.currentInvoice()) {
      return;
    }
    this._invoicesRepository.replaceOne(
      this.currentInvoice()?.uuid!,
      this.currentInvoice()!
    ).then(() => {
      // Track invoice edit analytics
      this._analyticsService.trackUserEngagement(
        'edit_invoice',
        'invoice',
        this.currentInvoice()?.name,
        1
      );

      this._browserTabTrackingService.disableProtection();
      this._notificationsService.success('notifications.invoice.edited');

      this.router.navigate(['/invoices', 'edit', this.currentInvoice()?.uuid]);
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }

  issueInvoice() {
    if (!this.currentInvoice()?.canBeUpdated) return;
    this.invoiceBuilderService.issueInvoice();
    this._invoicesRepository.replaceOne(
      this.currentInvoice()?.uuid!,
      this.currentInvoice()!
    ).then(() => {
      // Track invoice creation analytics
      this._analyticsService.trackInvoiceCreated(
        this.currentInvoice()?.invoice_number,
        this.currentInvoice()?.total,
        {
          invoice_uuid: this.currentInvoice()?.uuid,
          invoice_name: this.currentInvoice()?.name,
          items_count: this.currentInvoice()?.rows?.length || 0,
          state: this.currentInvoice()?.state
        }
      );

      this._browserTabTrackingService.disableProtection();
      this._notificationsService.success('invoices.issued');
      this.generatePDF();
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }
}
