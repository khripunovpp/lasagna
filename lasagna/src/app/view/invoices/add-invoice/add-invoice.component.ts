import {AfterViewInit, Component, OnInit, signal, viewChild} from '@angular/core';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddInvoiceFormComponent} from './add-invoice-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {FadeInComponent} from '../../ui/fade-in.component';
import {NotificationsService} from '@service/services/notifications.service';
import {take} from 'rxjs';
import {ButtonComponent} from '../../ui/layout/button.component';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {CurrencyPipe} from '@angular/common';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TranslatePipe} from '@ngx-translate/core';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '@view/ui/inline-separated-group.component';
import {Invoice} from '@service/models/Invoice';
import {InvoicesRepository} from '@service/repositories/invoices.repository';
import {errorHandler} from '@helpers/error.helper';

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
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    AddInvoiceFormComponent
  ],
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-gap-column size="medium">
          <lg-gap-row [center]="true" [mobileMode]="true">
            @if (invoice()?.uuid) {
              <lg-title>
                {{ invoice()?.name }}
              </lg-title>
            } @else {
              <lg-title>
                <!--                {{ 'invoice.form.title'|translate }}-->

                New invoice
              </lg-title>
            }
          </lg-gap-row>

          <lg-inline-separated-group>
            <ng-template lgInlineSeparatedGroup>
              <lg-button lgShrink [style]="'danger'"
                         [flat]="true"
                         (click)="onDeleteInvoice()">
                {{ 'invoice.form.delete-btn'|translate }}
              </lg-button>
            </ng-template>
          </lg-inline-separated-group>

          @if (invoice()?.updatedAt) {
            <small class="text-muted text-cursive">
              {{ 'edited-at-label'|translate }} {{ invoice()?.updatedAt | timeAgo }}
            </small>
          }

        </lg-gap-column>

        <lg-add-invoice-form [invoice]="invoice()"></lg-add-invoice-form>

        <lg-gap-row [mobileMode]="true" [relaxed]="true">
          @if (invoice()?.uuid) {
            <lg-button [disabled]="!formComponent()?.form?.dirty"
                       lgShrink
                       (click)="onEditInvoice()">
              @if (formComponent()?.form?.dirty) {
                {{ 'invoice.form.save-btn.edit.active'|translate }}
              } @else {
                {{ 'invoice.form.save-btn.edit.disabled'|translate }}
              }
            </lg-button>
          } @else {
            <lg-button lgShrink
                       [disabled]="!formComponent()?.form?.dirty"
                       (click)="onAddInvoice()">
              @if (formComponent()?.form?.dirty) {
                {{ 'invoice.form.save-btn.add.active'|translate }}
              } @else {
                {{ 'invoice.form.save-btn.add.disabled'|translate }}
              }
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
export class AddInvoiceComponent
  implements OnInit, AfterViewInit {
  constructor(
    public _router: Router,
    private _aRoute: ActivatedRoute,
    private _invoicesRepository: InvoicesRepository,
    private _notificationsService: NotificationsService,
  ) {
  }

  uuid = signal<string | undefined>(undefined);
  invoice = signal<Invoice | null>(null);
  formComponent = viewChild<AddInvoiceFormComponent | null>(AddInvoiceFormComponent);

  ngOnDestroy() {
  }

  ngOnInit() {
    this._aRoute.params.pipe(take(1)).subscribe(params => {
      this.uuid.set(params['uuid']);
      if (this.uuid()) {
        this._loadInvoice(this.uuid());
      } else {
        this.invoice.set(Invoice.fromRaw({
          name: 'some invoice',
          prefix: 'INV',
          invoice_number: '0001',
          credential_from: 'Your Company Name',
          credential_to: 'Client Name',
          date_issued: Date.now(),
          date_due: Date.now() + 30 * 24 * 60 * 60 * 1000, // Due in 30 days
          rows: [{
            amount: 100,
            payload: {
              type: 'freeStyle',
              data: {
                name: 'Item Name',
                price: 100,
              }
            }
          }, {
            amount: 50,
            payload: {
              type: 'product',
              data: 'e2dwd2wd2w'
            }
          },{
            amount: 1,
            payload: {
              type: 'recipe',
              data: '45ht3bt23t5'
            }
          }],
          notes: 'feel free to add notes here',
          terms: 'Payment is due within 30 days.',
        }));
      }
    });
  }

  ngAfterViewInit() {

  }

  onAddInvoice() {
    debugger
    if (!this.formComponent()?.validateForm()
      || !this.invoice()) {
      return;
    }
    this._addInvoice(this.invoice()!);
  }

  onEditInvoice() {
    debugger
    if (!this.formComponent()?.validateForm()
      || !this.invoice()) {
      return;
    }
    this._editInvoice(this.invoice()!);
  }

  onDeleteInvoice() {
    if (!this.invoice()?.uuid) {
      return;
    }
    this._invoicesRepository.deleteOne(this.invoice()!.uuid!).then(() => {
      this._notificationsService.success('Invoice deleted');
      this._router.navigate(['invoices']);
    });
  }

  private _addInvoice(invoice: Invoice) {
    this._invoicesRepository.addOne(invoice).then((newUUID) => {

      this.formComponent()?.resetForm();
      this._notificationsService.success('Invoice added');
      this.invoice.set(null);

      this._router.navigate(['invoices', 'edit', newUUID]);
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    })
  }

  private _editInvoice(invoice: Invoice) {
    if (!this.uuid()) {
      return;
    }
    this._invoicesRepository.replaceOne(this.uuid() as string, invoice).then(() => {
      this.formComponent()?.resetForm(invoice);
      this._notificationsService.success('Invoice edited');

      this._router.navigate(['invoices', 'edit', this.uuid()]);
    });
  }


  private _loadInvoice(uuid?: string) {
    if (!uuid) {
      return;
    }
    this._invoicesRepository.getOne(uuid, true).then(invoice => {

      if (!invoice) {
        return;
      }
      this.invoice.set(invoice);
    });
  }
}
