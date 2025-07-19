import {AfterViewInit, Component, computed, OnInit, signal, viewChild} from '@angular/core';
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
import {TranslatePipe} from '@ngx-translate/core';
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
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-add-invoice',
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
    ],
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-column size="medium">
          <lg-flex-row [center]="true"
                       [mobileReverse]="true"
                       [mobileMode]="true">
            @if (invoiceBuilderService.invoice()?.uuid) {
              <lg-title>
                {{ invoiceBuilderService.invoice()?.name }}
              </lg-title>
            } @else {
              <lg-title>
                {{ 'invoices.new-invoice' | translate }}
              </lg-title>
            }

            <span [ngClass]="stateBadgeClass()">
                {{ stateLabel() }}
              </span>


            <lg-inline-separated-group lgPull lgShrink>
              @if (invoiceBuilderService.invoice()?.canMarkPaid) {
                <ng-template lgInlineSeparatedGroup>
                  <lg-button (click)="changeState('paid')"
                             [flat]="true"
                             [style]="'success'"
                             lgShrink>
                    {{ 'invoices.mark-as-paid' | translate }}
                  </lg-button>
                </ng-template>
              }

              @if (invoiceBuilderService.invoice()?.canCancel) {
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
                         [disabled]="!!invoiceBuilderService.invoice()?.canBeUpdated"
                         [flat]="true"
                         [style]="'success'"
                         lgShrink>
                {{ 'invoices.generate-pdf' | translate }}
              </lg-button>
            </ng-template>

            <ng-template lgInlineSeparatedGroup>
              <lg-button (onClick)="copyInvoice()"
                         [flat]="true"
                         [style]="'warning'"
                         lgShrink>
                {{ 'invoices.copy' | translate }}
              </lg-button>
            </ng-template>

            <ng-template lgInlineSeparatedGroup>
              <lg-button (onClick)="onDeleteInvoice()" [flat]="true"
                         [style]="'danger'"
                         lgShrink>
                {{ 'invoices.delete' | translate }}
              </lg-button>
            </ng-template>
          </lg-inline-separated-group>

          @if (invoiceBuilderService.invoice()?.updatedAt) {
            <small class="text-muted text-cursive">
              {{ 'edited-at-label'|translate }} {{ this.invoiceBuilderService.invoice()?.updatedAt | timeAgo }}
            </small>
          }
        </lg-flex-column>

        <lg-add-invoice-form #formComponent></lg-add-invoice-form>

        <lg-flex-row [mobileMode]="true" [relaxed]="true">
          <lg-button (click)="editInvoice()"
                     [disabled]="!formComponent?.form?.dirty || !invoiceBuilderService.invoice()?.canBeUpdated"
                     lgShrink>
            @if (formComponent?.form?.dirty && invoiceBuilderService.invoice()?.canBeUpdated) {
              {{ 'invoices.save-changes' | translate }}
            } @else {
              {{ 'invoices.nothing-to-save' | translate }}
            }
          </lg-button>

          @if (invoiceBuilderService.invoice()?.canBeUpdated) {
            <lg-button (click)="issueInvoice()"
                       [style]="'success'"
                       lgShrink>
              {{ 'invoices.issue-and-download' | translate }}
            </lg-button>
          }
        </lg-flex-row>
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
export class AddInvoiceComponent
  implements OnInit, AfterViewInit {
  constructor(
    public invoiceBuilderService: InvoiceBuilderService,
    public router: Router,
    private _aRoute: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _loggerService: LoggerService,
    private _invoicesRepository: InvoicesRepository,
    private _browserTabTrackingService: BrowserTabTrackingService,
    private _translateService: TranslateService,
  ) {
  }

  uuid = signal<string | undefined>(undefined);
  formComponent = viewChild('formComponent', {read: AddInvoiceFormComponent});
  stateLabel = computed(() => {
    if (!this.invoiceBuilderService.invoice()) {
      return this._translateService.instant('invoices.state.unknown');
    }
    const state = this.invoiceBuilderService.invoice()!.state;
    const key = stateToLabelMap[state];
    return key ? this._translateService.instant(key) : this._translateService.instant('invoices.state.unknown');
  });
  stateBadgeClass = computed(() => {
    if (!this.invoiceBuilderService.invoice()) {
      return stateToBadgeClassMap['draft'];
    }
    const state = this.invoiceBuilderService.invoice()!.state;
    return stateToBadgeClassMap[state || 'draft'];
  });

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {

  }

  onDeleteInvoice() {
    if (!this.invoiceBuilderService.invoice()?.uuid) {
      return;
    }
    this._invoicesRepository.deleteOne(this.invoiceBuilderService.invoice()!.uuid!).then(() => {
      this._notificationsService.success('invoices.deleted');
      this.router.navigate(['invoices']);
    });
  }

  generatePDF() {
    if (!this.invoiceBuilderService.invoice()?.uuid) {
      return;
    }
    this._invoicesRepository.generatePdf(this.invoiceBuilderService.invoice()!);
  }

  copyInvoice() {
    if (!this.invoiceBuilderService.invoice()?.uuid) {
      return;
    }
    this._invoicesRepository.createCopy(this.invoiceBuilderService.invoice()!).then((newUUID) => {
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
    if (!this.invoiceBuilderService.invoice()) {
      return;
    }
    this._invoicesRepository.replaceOne(
      this.invoiceBuilderService.invoice()?.uuid!,
      this.invoiceBuilderService.invoice()!
    ).then(() => {
      this._browserTabTrackingService.disableProtection();
      this._notificationsService.success('Invoice edited');

      this.router.navigate(['/invoices', 'edit', this.invoiceBuilderService.invoice()?.uuid]);
    });
  }

  issueInvoice() {
    if (!this.invoiceBuilderService.invoice()?.canBeUpdated) return;
    this.invoiceBuilderService.issueInvoice();
    this._invoicesRepository.replaceOne(
      this.invoiceBuilderService.invoice()?.uuid!,
      this.invoiceBuilderService.invoice()!
    ).then(() => {
      this._browserTabTrackingService.disableProtection();
      this._notificationsService.success('invoices.issued');
      this.generatePDF();
    });
  }
}
