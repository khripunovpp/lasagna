import {
  DeleteConfirmationPopoverComponent
} from "./chunk-THRKIKLH.js";
import {
  DeleteConfirmationService
} from "./chunk-L354Z2XZ.js";
import {
  SelfStartDirective
} from "./chunk-3OLLO3KC.js";
import "./chunk-7PXYLFXV.js";
import {
  UploadComponent
} from "./chunk-ET6MMWHM.js";
import {
  TimeAgoPipe
} from "./chunk-N6SHWPG5.js";
import {
  FlexRowComponent
} from "./chunk-VVGY6OUS.js";
import "./chunk-SAGRZL2K.js";
import "./chunk-QX25EV4N.js";
import {
  TransferDataService
} from "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  NotificationsService
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import "./chunk-MV7X5YHM.js";
import {
  DexieIndexDbService
} from "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
import {
  FormsModule
} from "./chunk-2S3NUMNU.js";
import {
  injectQueryParams
} from "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import {
  CardComponent
} from "./chunk-G3SIWE5M.js";
import {
  ButtonComponent
} from "./chunk-MP6JNYP6.js";
import {
  FlexColumnComponent
} from "./chunk-K37ECZYU.js";
import "./chunk-AESGXZO7.js";
import "./chunk-2CTN2MPX.js";
import "./chunk-NJX644NS.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  TranslatePipe,
  TranslateService
} from "./chunk-755Q3QHA.js";
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/settings/view/backup/backup-settings.component.ts
function BackupSettingsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275pipe(2, "timeAgo");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(1, 2, "backup.last-label"), " ", \u0275\u0275pipeBind1(2, 4, ctx_r0.transferDataService.currenBackupDate), " ");
  }
}
var BackupSettingsComponent = class _BackupSettingsComponent {
  constructor() {
  }
  deleteConfirmationService = inject(DeleteConfirmationService);
  downloadBackupParam = injectQueryParams("download_backup");
  transferDataService = inject(TransferDataService);
  notificationsService = inject(NotificationsService);
  dexieIndexDbService = inject(DexieIndexDbService);
  translate = inject(TranslateService);
  _window = inject(WINDOW);
  ngAfterViewInit() {
    if (this.downloadBackupParam()) {
      this.onBackup();
    }
  }
  async onBackup() {
    const loader = this.notificationsService.loading(this.translate.instant("backup.creating"));
    try {
      await this.transferDataService.exportAll("json");
      this.notificationsService.success(this.translate.instant("backup.created"));
      this._window?.localStorage.setItem("lastBackupDate", Date.now().toString());
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e)], this.translate.instant("backup.failed"));
      console.error(e);
    } finally {
      loader.close();
    }
  }
  async onRestore(event) {
    this.deleteConfirmationService.configure({
      message: this.translate.instant("backup.restore-confirmation"),
      confirmText: this.translate.instant("backup.restore-confirmation-confirm"),
      onSuccess: async () => {
        const loader = this.notificationsService.loading(this.translate.instant("backup.restoring"));
        try {
          await this.transferDataService.restoreAllData(event);
          this.notificationsService.success(this.translate.instant("backup.restored"));
        } catch (e) {
          this.notificationsService.showJsonErrors([JSON.stringify(e?.toString()).trim()], this.translate.instant("backup.restore-failed"));
          console.error(e);
        } finally {
          loader.close();
          loader.close();
        }
      }
    });
  }
  async onFlush() {
    this.deleteConfirmationService.configure({
      message: this.translate.instant("backup.flush-confirmation"),
      confirmText: this.translate.instant("backup.flush-confirmation-confirm"),
      onSuccess: async () => {
        try {
          await this.dexieIndexDbService.flushCache();
          this.notificationsService.success(this.translate.instant("backup.flushed"));
          this._window?.location.reload();
        } catch (e) {
          this.notificationsService.showJsonErrors([JSON.stringify(e)], this.translate.instant("backup.flush-failed"));
          console.error(e);
        } finally {
        }
      }
    });
  }
  async onDeleteAll() {
    this.deleteConfirmationService.configure({
      message: this.translate.instant("backup.delete-all.confirmation"),
      confirmText: this.translate.instant("backup.delete-all.confirmation-confirm"),
      onSuccess: async () => {
        try {
          await this.dexieIndexDbService.deleteAllData();
          this._window?.localStorage.clear();
          this.notificationsService.success(this.translate.instant("all-data.deleted"));
          setTimeout(() => {
            this._window?.location.reload();
          }, 1e3);
        } catch (e) {
          this.notificationsService.showJsonErrors([JSON.stringify(e)], this.translate.instant("all-data.delete-failed"));
          console.error(e);
        } finally {
        }
      }
    });
  }
  static \u0275fac = function BackupSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BackupSettingsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BackupSettingsComponent, selectors: [["lg-backup-settings"]], features: [\u0275\u0275ProvidersFeature([
    DeleteConfirmationService
  ])], decls: 32, vars: 36, consts: [[3, "center", "mobileMode"], ["lgSelfStart", "", 3, "click"], [2, "--card-bg", "#fcd9b5"], [3, "position"], [1, "text-center"], [3, "click"], [3, "filesSelected", "accept"], [2, "--card-bg", "#e78888"], [1, "text-center", "text-inverse"]], template: function BackupSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-flex-column")(1, "lg-flex-row", 0)(2, "lg-button", 1);
      \u0275\u0275listener("click", function BackupSettingsComponent_Template_lg_button_click_2_listener() {
        return ctx.onBackup();
      });
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, BackupSettingsComponent_Conditional_5_Template, 3, 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "lg-card", 2)(7, "lg-flex-column", 3)(8, "div", 4);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "lg-button", 5);
      \u0275\u0275listener("click", function BackupSettingsComponent_Template_lg_button_click_11_listener() {
        return ctx.onFlush();
      });
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "lg-upload", 6);
      \u0275\u0275listener("filesSelected", function BackupSettingsComponent_Template_lg_upload_filesSelected_14_listener($event) {
        return ctx.onRestore($event);
      });
      \u0275\u0275elementStart(15, "lg-card", 7)(16, "lg-flex-column", 3)(17, "div", 8);
      \u0275\u0275text(18);
      \u0275\u0275pipe(19, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "lg-button");
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(23, "lg-card", 7)(24, "lg-flex-column", 3)(25, "div", 8);
      \u0275\u0275text(26);
      \u0275\u0275pipe(27, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "lg-button", 5);
      \u0275\u0275listener("click", function BackupSettingsComponent_Template_lg_button_click_28_listener() {
        return ctx.onDeleteAll();
      });
      \u0275\u0275text(29);
      \u0275\u0275pipe(30, "translate");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275element(31, "lg-delete-confirmation-popover");
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("center", true)("mobileMode", true);
      \u0275\u0275advance();
      \u0275\u0275styleMap("success");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 22, "backup.make-btn"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.transferDataService.currenBackupDate ? 5 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("position", "center");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 24, "backup.flush-informer"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("success");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 26, "backup.flush-btn"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("accept", ".json");
      \u0275\u0275advance(2);
      \u0275\u0275property("position", "center");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 28, "backup.restore-informer"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("danger");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 30, "backup.restore-btn"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275property("position", "center");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(27, 32, "backup.delete-all.informer"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275styleMap("danger");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(30, 34, "backup.delete-all.btn"), " ");
    }
  }, dependencies: [
    CardComponent,
    FlexRowComponent,
    FlexColumnComponent,
    FormsModule,
    ButtonComponent,
    UploadComponent,
    SelfStartDirective,
    DeleteConfirmationPopoverComponent,
    TimeAgoPipe,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BackupSettingsComponent, [{
    type: Component,
    args: [{ selector: "lg-backup-settings", standalone: true, template: `
    <lg-flex-column>
      <lg-flex-row [center]="true" [mobileMode]="true">
        <lg-button (click)="onBackup()"
                   [style]="'success'"
                   lgSelfStart>
          {{ 'backup.make-btn'|translate }}
        </lg-button>

        @if (transferDataService.currenBackupDate) {
          {{ 'backup.last-label'|translate }} {{ transferDataService.currenBackupDate | timeAgo }}
        }
      </lg-flex-row>

      <lg-card style="--card-bg:#fcd9b5">
        <lg-flex-column [position]="'center'">
          <div class="text-center">
            {{ 'backup.flush-informer'|translate }}
          </div>

          <lg-button (click)="onFlush()" [style]="'success'">
            {{ 'backup.flush-btn'|translate }}
          </lg-button>
        </lg-flex-column>
      </lg-card>

      <lg-upload (filesSelected)="onRestore($event)" [accept]="'.json'">
        <lg-card style="--card-bg:#e78888">
          <lg-flex-column [position]="'center'">
            <div class="text-center text-inverse">
              {{ 'backup.restore-informer'|translate }}
            </div>

            <lg-button [style]="'danger'">
              {{ 'backup.restore-btn'|translate }}
            </lg-button>
          </lg-flex-column>
        </lg-card>
      </lg-upload>

      <lg-card style="--card-bg:#e78888">
        <lg-flex-column [position]="'center'">
          <div class="text-center text-inverse">
            {{ 'backup.delete-all.informer'|translate }}
          </div>

          <lg-button (click)="onDeleteAll()" [style]="'danger'">
            {{ 'backup.delete-all.btn'|translate }}
          </lg-button>
        </lg-flex-column>
      </lg-card>
    </lg-flex-column>

    <lg-delete-confirmation-popover></lg-delete-confirmation-popover>
  `, imports: [
      CardComponent,
      FlexRowComponent,
      FlexColumnComponent,
      FormsModule,
      TimeAgoPipe,
      ButtonComponent,
      UploadComponent,
      TranslatePipe,
      SelfStartDirective,
      DeleteConfirmationPopoverComponent
    ], providers: [
      DeleteConfirmationService
    ] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BackupSettingsComponent, { className: "BackupSettingsComponent", filePath: "src/app/features/settings/view/backup/backup-settings.component.ts", lineNumber: 97 });
})();
export {
  BackupSettingsComponent
};
//# sourceMappingURL=chunk-STEANTW2.js.map
