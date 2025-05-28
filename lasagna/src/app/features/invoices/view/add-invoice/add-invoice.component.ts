import {AfterViewInit, Component, OnInit, signal} from '@angular/core';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {AddInvoiceFormComponent} from './add-invoice-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GapRowComponent} from '../../../../shared/view/ui/layout/gap-row.component';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {ShrinkDirective} from '../../../../shared/view/directives/shrink.directive';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {CurrencyPipe} from '@angular/common';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TranslatePipe} from '@ngx-translate/core';
import {GapColumnComponent} from '../../../../shared/view/ui/layout/gap-column.component';
import {InvoiceBuilderService} from '../invoice-builder.service';
import {LoggerService} from '../../../logger/logger.service';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    GapRowComponent,
    FadeInComponent,
    ButtonComponent,
    ShrinkDirective,
    TimeAgoPipe,
    TranslatePipe,
    GapColumnComponent,
    AddInvoiceFormComponent
  ],
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-column size="medium">
                  <lg-gap-row [center]="true" [mobileMode]="true">
                      @if (invoiceBuilderService.invoice()?.uuid) {
                          <lg-title>
                              {{ invoiceBuilderService.invoice()?.name }}
                          </lg-title>
                      } @else {
                          <lg-title>
                              New invoice
                          </lg-title>
                      }
                  </lg-gap-row>

                  <!--          <lg-inline-separated-group>-->

                  <!--            <ng-template lgInlineSeparatedGroup>-->
                  <!--              <lg-button lgShrink-->
                  <!--                         [style]="'success'"-->
                  <!--                         [flat]="true"-->
                  <!--                         (click)="generatePDF()">-->
                  <!--                Generate PDF-->
                  <!--              </lg-button>-->
                  <!--            </ng-template>-->

                  <!--            <ng-template lgInlineSeparatedGroup>-->
                  <!--              <lg-button lgShrink-->
                  <!--                         [style]="'warning'"-->
                  <!--                         [flat]="true"-->
                  <!--                         (click)="copyInvoice()">-->
                  <!--                Copy-->
                  <!--              </lg-button>-->
                  <!--            </ng-template>-->

                  <!--            <ng-template lgInlineSeparatedGroup>-->
                  <!--              <lg-button lgShrink [style]="'danger'"-->
                  <!--                         [flat]="true"-->
                  <!--                         (click)="onDeleteInvoice()">-->
                  <!--                Delete Invoice-->
                  <!--              </lg-button>-->
                  <!--            </ng-template>-->
                  <!--          </lg-inline-separated-group>-->

                  @if (invoiceBuilderService.invoice()?.updatedAt) {
                      <small class="text-muted text-cursive">
                          {{ 'edited-at-label'|translate }} {{ this.invoiceBuilderService.invoice()?.updatedAt | timeAgo }}
                      </small>
                  }
              </lg-gap-column>

              <lg-add-invoice-form #formComponent></lg-add-invoice-form>

              <lg-gap-row [mobileMode]="true" [relaxed]="true">
                  <lg-button [disabled]="!formComponent?.form?.dirty"
                             lgShrink
                             (click)="editInvoice()">
                      @if (formComponent?.form?.dirty) {
                          Save changes
                      } @else {
                          Nothing to save
                      }
                  </lg-button>
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
export class AddInvoiceComponent
  implements OnInit, AfterViewInit {
  constructor(
    public invoiceBuilderService: InvoiceBuilderService,
    public router: Router,
    private _aRoute: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _loggerService: LoggerService,
  ) {
  }

  uuid = signal<string | undefined>(undefined);

  ngOnDestroy() {
  }

  ngOnInit() {
    this._loggerService.log('ngOnInit')
  }

  ngAfterViewInit() {
  }

  onDeleteInvoice() {
    // if (!this.invoiceBuilderService.invoice()?.uuid) {
    //   return;
    // }
    // this._invoicesRepository.deleteOne(this.invoiceBuilderService.invoice()!.uuid!).then(() => {
    //   this._notificationsService.success('Invoice deleted');
    //   this.router.navigate(['invoices']);
    // });
  }

  generatePDF() {
    // if (!this.invoiceBuilderService.invoice()?.uuid) {
    //   return;
    // }
    // this._invoicesRepository.generatePdf(this.invoiceBuilderService.invoice()!);
  }

  copyInvoice() {
    if (!this.invoiceBuilderService.invoice()?.uuid) {
      return;
    }
    // this._invoicesRepository.createCopy(this.invoice()!).then((newUUID) => {
    //   this._notificationsService.success('Invoice copied');
    //   this.router.navigate(['invoices', 'edit', newUUID]).then(() => {
    //     window.location.reload();
    //   })
    // }).catch(err => {
    //   this._notificationsService.error(errorHandler(err));
    // });
  }

  editInvoice() {
    // if (!this.invoiceBuilderService.invoice()) {
    //   return;
    // }
    // this._invoicesRepository.replaceOne(
    //   this.invoiceBuilderService.invoice()?.uuid!,
    //   this.invoiceBuilderService.invoice()!
    // ).then(() => {
    //   // this.formComponent()?.resetForm(invoice);
    //   this._notificationsService.success('Invoice edited');
    //
    //   this.router.navigate(['/invoices', 'edit', this.invoiceBuilderService.invoice()?.uuid]);
    // });
  }
}
