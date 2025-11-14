import {
  CheckboxComponent
} from "./chunk-ZVJRZSZB.js";
import {
  DialogComponent
} from "./chunk-426Q7OK4.js";
import {
  FormControl,
  FormControlDirective,
  NgControlStatus,
  ReactiveFormsModule,
  takeUntilDestroyed
} from "./chunk-RTCNHMN6.js";
import {
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import {
  FlexColumnComponent
} from "./chunk-L3Q75KKL.js";
import {
  Component,
  Injectable,
  effect,
  inject,
  setClassMetadata,
  signal,
  timer,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-RQATVJ2P.js";

// src/app/shared/view/ui/delete-confirmation-popover/delete-confirmation.service.ts
var DeleteConfirmationService = class _DeleteConfirmationService {
  settings = signal(null, ...ngDevMode ? [{ debugName: "settings" }] : []);
  configure({ onSuccess, onCancel, message, confirmText, cancelText, withLock }) {
    this.settings.set({ onSuccess, onCancel, message, confirmText, cancelText, withLock });
  }
  static \u0275fac = function DeleteConfirmationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeleteConfirmationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DeleteConfirmationService, factory: _DeleteConfirmationService.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeleteConfirmationService, [{
    type: Injectable
  }], null, null);
})();

// src/app/shared/view/ui/delete-confirmation-popover/delete-confirmation-popover.component.ts
function DeleteConfirmationPopoverComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-checkbox", 2);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formControl", ctx_r0.locked)("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 3, "delete-lock-label"), " ");
  }
}
var DeleteConfirmationPopoverComponent = class _DeleteConfirmationPopoverComponent {
  _service = inject(DeleteConfirmationService);
  settings = this._service.settings;
  dialogRef = viewChild(DialogComponent, ...ngDevMode ? [{ debugName: "dialogRef" }] : []);
  locked = new FormControl(false);
  eff = effect(() => {
    if (this.settings() && !this.locked.value) {
      this.dialogRef()?.open();
    } else {
      this.dialogRef()?.close();
    }
  }, ...ngDevMode ? [{ debugName: "eff" }] : []);
  onConfirm() {
    this._emit(true);
    if (this.locked.value) {
      timer(5e4).pipe(takeUntilDestroyed()).subscribe(() => {
        this.locked.setValue(false);
      });
    }
  }
  onCancel() {
    this._emit(false);
    this.locked.setValue(false);
  }
  _emit(confirmed) {
    if (confirmed) {
      this.settings()?.onSuccess();
    } else {
      this.settings()?.onCancel?.();
    }
    this.settings.set(null);
  }
  static \u0275fac = function DeleteConfirmationPopoverComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeleteConfirmationPopoverComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeleteConfirmationPopoverComponent, selectors: [["lg-delete-confirmation-popover"]], viewQuery: function DeleteConfirmationPopoverComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.dialogRef, DialogComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 7, vars: 14, consts: [[3, "onCancel", "onConfirm", "cancelButtonStyle", "cancelButtonText", "centerButtons", "columnButtons", "confirmButtonStyle", "confirmButtonText"], [3, "position", "size"], ["name", "disable-deletion", 3, "formControl", "size"]], template: function DeleteConfirmationPopoverComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "lg-dialog", 0);
      \u0275\u0275pipe(1, "translate");
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275listener("onCancel", function DeleteConfirmationPopoverComponent_Template_lg_dialog_onCancel_0_listener() {
        return ctx.onCancel();
      })("onConfirm", function DeleteConfirmationPopoverComponent_Template_lg_dialog_onConfirm_0_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275elementStart(3, "lg-flex-column", 1)(4, "div");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, DeleteConfirmationPopoverComponent_Conditional_6_Template, 3, 5, "lg-checkbox", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_5_0;
      let tmp_8_0;
      let tmp_9_0;
      \u0275\u0275property("cancelButtonStyle", "primary")("cancelButtonText", ((tmp_1_0 = ctx.settings()) == null ? null : tmp_1_0.cancelText) ?? \u0275\u0275pipeBind1(1, 10, "delete-close-label"))("centerButtons", true)("columnButtons", false)("confirmButtonStyle", "secondary")("confirmButtonText", ((tmp_5_0 = ctx.settings()) == null ? null : tmp_5_0.confirmText) ?? \u0275\u0275pipeBind1(2, 12, "delete-confirm-label"));
      \u0275\u0275advance(3);
      \u0275\u0275property("position", "center")("size", "small");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate((tmp_8_0 = ctx.settings()) == null ? null : tmp_8_0.message);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_9_0 = ctx.settings()) == null ? null : tmp_9_0.withLock) ? 6 : -1);
    }
  }, dependencies: [
    DialogComponent,
    CheckboxComponent,
    ReactiveFormsModule,
    NgControlStatus,
    FormControlDirective,
    FlexColumnComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeleteConfirmationPopoverComponent, [{
    type: Component,
    args: [{
      selector: "lg-delete-confirmation-popover",
      template: `
    <lg-dialog (onCancel)="onCancel()"
               (onConfirm)="onConfirm()"
               [cancelButtonStyle]="'primary'"
               [cancelButtonText]="settings()?.cancelText ?? ('delete-close-label'|translate)"
               [centerButtons]="true"
               [columnButtons]="false"
               [confirmButtonStyle]="'secondary'"
               [confirmButtonText]="settings()?.confirmText ?? ('delete-confirm-label'|translate)">
      <lg-flex-column [position]="'center'" [size]="'small'">
        <div>{{ settings()?.message }}</div>

        @if (settings()?.withLock) {
          <lg-checkbox [formControl]="locked"
                       [size]="'medium'"
                       name="disable-deletion">
            {{ 'delete-lock-label' | translate }}
          </lg-checkbox>
        }
      </lg-flex-column>
    </lg-dialog>
  `,
      imports: [
        DialogComponent,
        TranslatePipe,
        CheckboxComponent,
        ReactiveFormsModule,
        FlexColumnComponent
      ]
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeleteConfirmationPopoverComponent, { className: "DeleteConfirmationPopoverComponent", filePath: "src/app/shared/view/ui/delete-confirmation-popover/delete-confirmation-popover.component.ts", lineNumber: 43 });
})();

export {
  DeleteConfirmationService,
  DeleteConfirmationPopoverComponent
};
//# sourceMappingURL=chunk-GLD4YSG5.js.map
