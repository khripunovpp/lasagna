import {
  TimeAgoPipe
} from "./chunk-N6SHWPG5.js";
import {
  UserService
} from "./chunk-CMRNWKEI.js";
import "./chunk-CFCFQO5U.js";
import "./chunk-RBDPPOGX.js";
import "./chunk-BUGRPEBT.js";
import "./chunk-BPMAQ256.js";
import "./chunk-OGDPSEDB.js";
import {
  NotificationsService
} from "./chunk-6WNKKHFO.js";
import "./chunk-NLONWH5J.js";
import "./chunk-MV7X5YHM.js";
import "./chunk-QHJLSFIB.js";
import "./chunk-3UJV2MM3.js";
import "./chunk-UG5XPMCB.js";
import "./chunk-XXA7PPXB.js";
import {
  errorHandler
} from "./chunk-XIU3WVPC.js";
import "./chunk-T5CRNY7R.js";
import "./chunk-IWOUTMKL.js";
import "./chunk-R5O3TEDB.js";
import "./chunk-KM2DRJZA.js";
import "./chunk-2S3NUMNU.js";
import "./chunk-PHCOZAXM.js";
import "./chunk-AWZMWU52.js";
import "./chunk-5WJUMO7X.js";
import "./chunk-AESGXZO7.js";
import "./chunk-2CTN2MPX.js";
import "./chunk-NJX644NS.js";
import {
  WINDOW
} from "./chunk-CFXQGSQM.js";
import {
  TranslatePipe
} from "./chunk-755Q3QHA.js";
import {
  RouterLink
} from "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import {
  TitleCasePipe
} from "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  Component,
  HostListener,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/home/view/last-backup-informer.component.ts
var _c0 = () => ["/settings"];
var _c1 = () => ({ download_backup: true, tab: "backup" });
function LastBackupInformerComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "timeAgo");
    \u0275\u0275pipe(2, "titlecase");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 3, \u0275\u0275pipeBind1(1, 1, ctx_r1.lastBackupDate())), " ");
  }
}
function LastBackupInformerComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "backup.no-backup"), " ");
  }
}
function LastBackupInformerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 1);
    \u0275\u0275listener("click", function LastBackupInformerComponent_Conditional_0_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.hide());
    });
    \u0275\u0275conditionalCreate(1, LastBackupInformerComponent_Conditional_0_Conditional_1_Template, 3, 5)(2, LastBackupInformerComponent_Conditional_0_Conditional_2_Template, 2, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(3, _c0))("queryParams", \u0275\u0275pureFunction0(4, _c1));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.lastBackupDate() ? 1 : 2);
  }
}
var LastBackupInformerComponent = class _LastBackupInformerComponent {
  constructor() {
  }
  oneDayInMilliseconds = 24 * 60 * 60 * 1e3;
  twoWeeksInMilliseconds = 14 * this.oneDayInMilliseconds;
  userService = inject(UserService);
  storedBackupDate = signal(this._getStoredDate(), ...ngDevMode ? [{ debugName: "storedBackupDate" }] : []);
  today = /* @__PURE__ */ new Date();
  lastBackupDate = computed(() => this.storedBackupDate() ? new Date(this.storedBackupDate()) : void 0, ...ngDevMode ? [{ debugName: "lastBackupDate" }] : []);
  _notificationsService = inject(NotificationsService);
  showButton = computed(() => {
    try {
      if (this._window?.location.hostname === "localhost") {
        return false;
      }
      const sinceDate = this.userService.isUserFirstDate;
      if (!sinceDate) {
        return false;
      }
      const todayTs = this.today.getTime();
      const sinceDateTs = sinceDate.getTime();
      const diffInMilliseconds = todayTs - sinceDateTs;
      if (diffInMilliseconds < 0) {
        return false;
      }
      if (diffInMilliseconds < this.twoWeeksInMilliseconds) {
        return false;
      }
      if (!this.lastBackupDate()) {
        return true;
      }
      const lastBackupDateTs = this.lastBackupDate().getTime();
      return lastBackupDateTs < sinceDateTs || lastBackupDateTs < todayTs - this.twoWeeksInMilliseconds;
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
      return false;
    }
  }, ...ngDevMode ? [{ debugName: "showButton" }] : []);
  _window = inject(WINDOW);
  hide() {
    this.storedBackupDate.set(null);
  }
  onClick(event) {
    setTimeout(() => {
      this.storedBackupDate.set(this._getStoredDate());
    }, 500);
  }
  _getStoredDate() {
    try {
      return this._window?.localStorage.getItem("lastBackupDate") || null;
    } catch (e) {
      console.log("e", e);
      return null;
    }
  }
  static \u0275fac = function LastBackupInformerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LastBackupInformerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LastBackupInformerComponent, selectors: [["lg-last-backup-informer"]], hostBindings: function LastBackupInformerComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function LastBackupInformerComponent_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  }, decls: 1, vars: 1, consts: [[3, "routerLink", "queryParams"], [3, "click", "routerLink", "queryParams"]], template: function LastBackupInformerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, LastBackupInformerComponent_Conditional_0_Template, 3, 5, "a", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.showButton() ? 0 : -1);
    }
  }, dependencies: [
    RouterLink,
    TimeAgoPipe,
    TitleCasePipe,
    TranslatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\na[_ngcontent-%COMP%] {\n  background-image:\n    linear-gradient(\n      45deg,\n      #de2c51,\n      #fff400);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  border-radius: 0 16px 16px 0;\n  background-size: calc(100% + 70px) 100%;\n  transition: background-position 0.3s ease;\n  white-space: nowrap;\n}\na[_ngcontent-%COMP%]:hover {\n  background-position: -70px 0;\n}\n/*# sourceMappingURL=last-backup-informer.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LastBackupInformerComponent, [{
    type: Component,
    args: [{ selector: "lg-last-backup-informer", standalone: true, template: `
    @if (showButton()) {
      <a [routerLink]="['/settings']"
         (click)="hide()"
         [queryParams]="{download_backup: true,tab:'backup'}">
        @if (lastBackupDate()) {
          {{ lastBackupDate() | timeAgo | titlecase }}
        } @else {
          {{ 'backup.no-backup' | translate }}
        }
      </a>
    }
  `, imports: [
      TimeAgoPipe,
      TitleCasePipe,
      RouterLink,
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;7afe8b80a06680d319d4b4df81ebbb9a8d212169c54e5f878595a831982ffdd5;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/last-backup-informer.component.ts */\n:host {\n  display: contents;\n}\na {\n  background-image:\n    linear-gradient(\n      45deg,\n      #de2c51,\n      #fff400);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  border-radius: 0 16px 16px 0;\n  background-size: calc(100% + 70px) 100%;\n  transition: background-position 0.3s ease;\n  white-space: nowrap;\n}\na:hover {\n  background-position: -70px 0;\n}\n/*# sourceMappingURL=last-backup-informer.component.css.map */\n"] }]
  }], () => [], { onClick: [{
    type: HostListener,
    args: ["click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LastBackupInformerComponent, { className: "LastBackupInformerComponent", filePath: "src/app/features/home/view/last-backup-informer.component.ts", lineNumber: 57 });
})();
export {
  LastBackupInformerComponent
};
//# sourceMappingURL=chunk-VFMVAOXH.js.map
