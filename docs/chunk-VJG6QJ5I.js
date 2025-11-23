import {
  AnalyticsService
} from "./chunk-KXZ2SBHP.js";
import {
  IS_PWA
} from "./chunk-N7QJ3KHG.js";
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
import "./chunk-L34DFTMV.js";
import "./chunk-USF337CA.js";
import "./chunk-VVQKNBNV.js";
import "./chunk-X2X7GTPW.js";
import "./chunk-PZQLIUCM.js";
import "./chunk-7YWLATDR.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IYCVPBRB.js";
import "./chunk-46DXP6YY.js";

// src/app/features/home/view/pwa-install.component.ts
function PwaInstallComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 0);
    \u0275\u0275domListener("click", function PwaInstallComponent_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.installPWA());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "pwa.install"), " ");
  }
}
var PwaInstallComponent = class _PwaInstallComponent {
  showButton = signal(false, ...ngDevMode ? [{ debugName: "showButton" }] : []);
  isPwa = inject(IS_PWA);
  analyticsService = inject(AnalyticsService);
  _notificationsService = inject(NotificationsService);
  _deferredPrompt = null;
  _window = inject(WINDOW);
  ngOnInit() {
    if (this._alreadyDeclined()) {
      return;
    }
    if (!this._window) {
      return;
    }
    this._window.addEventListener("beforeinstallprompt", (e) => {
      if (this._alreadyDeclined()) {
        return;
      }
      this._deferredPrompt = e;
      this.showButton.set(true);
    });
    this._window.addEventListener("appinstalled", () => {
      this._onSuccess();
    });
  }
  async installPWA() {
    try {
      if (!this._deferredPrompt)
        return;
      this._deferredPrompt.preventDefault();
      this._deferredPrompt.prompt();
      const { outcome } = await this._deferredPrompt.userChoice;
      if (outcome === "accepted") {
        this._onSuccess();
      } else {
        this._onDecline();
      }
      this._deferredPrompt = null;
      this.showButton.set(false);
    } catch (error) {
      this._notificationsService.error(errorHandler(error));
    }
  }
  _alreadyDeclined() {
    try {
      return this._window?.localStorage.getItem("pwa-install-declined") === "true";
    } catch {
      return false;
    }
  }
  _setDeclinedStatus(value) {
    try {
      this._window?.localStorage.setItem("pwa-install-declined", value ? "true" : "false");
    } catch {
    }
  }
  _onSuccess() {
    console.log("PWA installed!");
    this.showButton.set(false);
    this.analyticsService.trackPwaInstallAccepted();
  }
  _onDecline() {
    console.log("User declined installation");
    this.showButton.set(false);
    this._setDeclinedStatus(true);
    this.analyticsService.trackPwaInstallDeclined();
  }
  static \u0275fac = function PwaInstallComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PwaInstallComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PwaInstallComponent, selectors: [["lg-pwa-install"]], decls: 1, vars: 1, consts: [[3, "click"]], template: function PwaInstallComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PwaInstallComponent_Conditional_0_Template, 3, 3, "button");
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.showButton() ? 0 : -1);
    }
  }, dependencies: [TranslatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: contents;\n}\nbutton[_ngcontent-%COMP%] {\n  background-image:\n    linear-gradient(\n      45deg,\n      #3F51B5,\n      #9C27B0);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  cursor: pointer;\n  box-shadow: -15px 6px 8px 0px #eed2f0;\n  border-radius: 0 16px 16px 0;\n  background-size: calc(100% + 70px) 100%;\n  transition: background-position 0.3s ease;\n  text-decoration: none;\n  white-space: nowrap;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background-position: -70px 0;\n}\n/*# sourceMappingURL=pwa-install.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PwaInstallComponent, [{
    type: Component,
    args: [{ selector: "lg-pwa-install", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (showButton()) {
      <button (click)="installPWA()">
        {{ 'pwa.install' | translate }}
      </button>
    }
  `, imports: [
      TranslatePipe
    ], styles: ["/* angular:styles/component:scss;25b948535c624d82af95fda8121e85cb54bb6594e5ccc9bc881003a67efa58a1;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/features/home/view/pwa-install.component.ts */\n:host {\n  display: contents;\n}\nbutton {\n  background-image:\n    linear-gradient(\n      45deg,\n      #3F51B5,\n      #9C27B0);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  cursor: pointer;\n  box-shadow: -15px 6px 8px 0px #eed2f0;\n  border-radius: 0 16px 16px 0;\n  background-size: calc(100% + 70px) 100%;\n  transition: background-position 0.3s ease;\n  text-decoration: none;\n  white-space: nowrap;\n}\nbutton:hover {\n  background-position: -70px 0;\n}\n/*# sourceMappingURL=pwa-install.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PwaInstallComponent, { className: "PwaInstallComponent", filePath: "src/app/features/home/view/pwa-install.component.ts", lineNumber: 46 });
})();
export {
  PwaInstallComponent
};
//# sourceMappingURL=chunk-VJG6QJ5I.js.map
