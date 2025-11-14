import {
  UploadComponent
} from "./chunk-C3HNT7UU.js";
import {
  PortalComponent
} from "./chunk-5SBCRB6Y.js";
import {
  DialogComponent
} from "./chunk-426Q7OK4.js";
import {
  FlexRowComponent
} from "./chunk-WJNK66FX.js";
import {
  CsvReaderService
} from "./chunk-NMSYXSQT.js";
import {
  NotificationsService,
  errorHandler,
  parseZodError
} from "./chunk-5PDR5QLJ.js";
import {
  DexieIndexDbService
} from "./chunk-OOJ6JS4B.js";
import {
  CheckboxControlValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-RTCNHMN6.js";
import {
  ButtonComponent
} from "./chunk-4JEN4JYG.js";
import {
  TranslatePipe
} from "./chunk-DXRFKXPR.js";
import {
  FlexColumnComponent
} from "./chunk-L3Q75KKL.js";
import {
  AsyncPipe,
  NgClass,
  NgTemplateOutlet
} from "./chunk-7I2CR6I6.js";
import {
  Component,
  Directive,
  Input,
  Subject,
  TemplateRef,
  ViewChild,
  contentChild,
  inject,
  input,
  model,
  output,
  scan,
  setClassMetadata,
  startWith,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-RQATVJ2P.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-46DXP6YY.js";

// src/app/shared/view/ui/import/import-row-tpl.directive.ts
var ImportRowTplDirective = class _ImportRowTplDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static \u0275fac = function ImportRowTplDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportRowTplDirective)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ImportRowTplDirective, selectors: [["", "lgImportRowTpl", ""]] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImportRowTplDirective, [{
    type: Directive,
    args: [{
      selector: "[lgImportRowTpl]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }], null);
})();

// src/app/shared/view/ui/import/import.component.ts
var _c0 = (a0) => ({ $implicit: a0, flow: "new" });
var _c1 = (a0) => ({ $implicit: a0, flow: "old" });
var _forTrack0 = ($index, $item) => $item.name + $item.uuid;
function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_2_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const row_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.rowsToUpdate[row_r3.name], $event) || (ctx_r3.rowsToUpdate[row_r3.name] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.rowsToUpdate[row_r3.name]);
    \u0275\u0275property("disabled", ctx_r3.rowsToSkip[row_r3.name]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 3, "update-label"), " ");
  }
}
function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_3_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const row_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.rowsToAdd[row_r3.name], $event) || (ctx_r3.rowsToAdd[row_r3.name] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.rowsToAdd[row_r3.name]);
    \u0275\u0275property("disabled", ctx_r3.rowsToSkip[row_r3.name]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 3, "add-label"), " ");
  }
}
function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 12);
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.rowTemplate().templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, row_r3));
  }
}
function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_5_Conditional_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_5_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_5_Conditional_5_ng_container_0_Template, 1, 0, "ng-container", 12);
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext(2).$implicit;
    const duplicates_r7 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r3.rowTemplate().templateRef)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c1, duplicates_r7[row_r3.uuid] || duplicates_r7[row_r3.name]));
  }
}
function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_5_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const row_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.rowsToSkip[row_r3.name], $event) || (ctx_r3.rowsToSkip[row_r3.name] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_5_Conditional_5_Template, 1, 4, "ng-container");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("disabled", ctx_r3.rowsToUpdate[row_r3.name])("skip", ctx_r3.rowsToUpdate[row_r3.name]);
    \u0275\u0275property("ngClass", ctx_r3.rowsToSkip[row_r3.name] ? "skip" : "duplicated");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.rowsToSkip[row_r3.name]);
    \u0275\u0275property("disabled", ctx_r3.rowsToAdd[row_r3.name] || ctx_r3.rowsToUpdate[row_r3.name]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 9, ctx_r3.rowsToSkip[row_r3.name] ? "skip-label" : "duplicates-label"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.rowTemplate() ? 5 : -1);
  }
}
function ImportComponent_Conditional_10_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 7)(1, "div", 8);
    \u0275\u0275conditionalCreate(2, ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_2_Template, 3, 5)(3, ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_3_Template, 3, 5);
    \u0275\u0275conditionalCreate(4, ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_4_Template, 1, 4, "ng-container");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ImportComponent_Conditional_10_Conditional_0_For_2_Conditional_5_Template, 6, 11, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    const duplicates_r7 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("size", "small");
    \u0275\u0275advance();
    \u0275\u0275classProp("update", ctx_r3.rowsToUpdate[row_r3.name])("add", ctx_r3.rowsToAdd[row_r3.name])("disabled", ctx_r3.rowsToSkip[row_r3.name]);
    \u0275\u0275advance();
    \u0275\u0275conditional(duplicates_r7[row_r3.uuid] || duplicates_r7[row_r3.name] ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.rowTemplate() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(duplicates_r7[row_r3.uuid] || duplicates_r7[row_r3.name] ? 5 : -1);
  }
}
function ImportComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "lg-flex-column", 7);
    \u0275\u0275repeaterCreate(1, ImportComponent_Conditional_10_Conditional_0_For_2_Template, 6, 10, "lg-flex-column", 7, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r8 = \u0275\u0275nextContext();
    \u0275\u0275property("size", "medium");
    \u0275\u0275advance();
    \u0275\u0275repeater(data_r8);
  }
}
function ImportComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ImportComponent_Conditional_10_Conditional_0_Template, 3, 1, "lg-flex-column", 7);
    \u0275\u0275pipe(1, "async");
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_3_0 = \u0275\u0275pipeBind1(1, 1, ctx_r3.analize$)) ? 0 : -1, tmp_3_0);
  }
}
var ImportComponent = class _ImportComponent {
  _csvReaderService;
  _indexDbService;
  constructor(_csvReaderService, _indexDbService) {
    this._csvReaderService = _csvReaderService;
    this._indexDbService = _indexDbService;
  }
  label = "import-label";
  rowsToAdd = {};
  rowsToUpdate = {};
  rowsToSkip = {};
  onDone = output();
  storeName = input(null, ...ngDevMode ? [{ debugName: "storeName" }] : []);
  schema = input(...ngDevMode ? [void 0, { debugName: "schema" }] : []);
  skipAllDuplicates = model(false, ...ngDevMode ? [{ debugName: "skipAllDuplicates" }] : []);
  replaceAll = model(false, ...ngDevMode ? [{ debugName: "replaceAll" }] : []);
  rowTemplate = contentChild(ImportRowTplDirective, ...ngDevMode ? [{ debugName: "rowTemplate" }] : []);
  analizeSubject = new Subject();
  dataSubject = new Subject();
  data$ = this.dataSubject.asObservable().pipe(startWith([]), scan((acc, value) => {
    if (value == null) {
      return [];
    }
    return [
      ...acc,
      value
    ];
  }));
  analize$ = this.analizeSubject.asObservable().pipe(startWith([]), scan((acc, value) => {
    if (value == null) {
      return [];
    }
    if (!value.uuid || !value.name) {
      return acc;
    }
    return __spreadProps(__spreadValues({}, acc), {
      [value.uuid]: value,
      [value.name]: value
    });
  }));
  dialog;
  upload = viewChild(UploadComponent, ...ngDevMode ? [{ debugName: "upload" }] : []);
  parsedData = [];
  async onConfirm() {
    for (const item of this.parsedData) {
      if (this.rowsToAdd[item.name]) {
        await this._indexDbService.addData(this.storeName(), item, item.uuid);
      } else if (this.rowsToUpdate[item.name] && !this.skipAllDuplicates()) {
        await this._indexDbService.replaceData(this.storeName(), item.uuid, item);
      }
    }
    this.clear();
    this.onDone.emit();
    this.dialog.close();
  }
  onClose() {
    this.clear();
    this.dialog.close();
  }
  clear() {
    this.upload().clear();
    this.rowsToAdd = {};
    this.rowsToUpdate = {};
    this.rowsToSkip = {};
    this.parsedData = [];
    this.dataSubject.next(null);
    this.analizeSubject.next(null);
    this.skipAllDuplicates.set(false);
    this.replaceAll.set(false);
  }
  onReplaceAll() {
    if (this.replaceAll()) {
      this.parsedData.forEach((item) => {
        if (this.rowsToAdd[item.name]) {
          return;
        }
        this.rowsToUpdate[item.name] = true;
      });
    } else {
      this.rowsToAdd = {};
    }
  }
  _notificationsService = inject(NotificationsService);
  onSkipAllDuplicates() {
    if (this.skipAllDuplicates()) {
      this.parsedData.forEach((item) => {
        if (this.rowsToAdd[item.name]) {
          return;
        }
        this.rowsToSkip[item.name] = true;
        if (this.rowsToUpdate[item.name]) {
          this.rowsToUpdate[item.name] = false;
        }
      });
    } else {
      this.rowsToSkip = {};
    }
  }
  async onFileSelected(file) {
    try {
      const result = await this._csvReaderService.readFromJSONFile(file[0]);
      const currentDbVersion = await this._indexDbService.getVersion();
      if (!result?.data) {
        throw new Error("Invalid file content: data property is missing");
      }
      if (!result?.version || result.version > currentDbVersion) {
        throw new Error("The database version is lower than the data version. Please update the application to the latest version. Current version: " + currentDbVersion + ", data version: " + result.version);
      }
      for (const record of result.data) {
        await this._validateData(record);
        if (!this.storeName()) {
          console.log("storeName is not set");
          return;
        }
        this.dataSubject.next(record);
        this.parsedData.push(record);
        await this._analyzeDuplicates(record).then((data) => {
          if (data.duplicate) {
            this.analizeSubject.next(data.data[0]);
          } else {
            this.rowsToAdd[record.name] = true;
          }
        });
      }
      this.dialog.open();
    } catch (e) {
      this._notificationsService.error("Can not import data: " + errorHandler(e));
    }
  }
  async _validateData(data) {
    const currentDbVersion = await this._indexDbService.getVersion();
    console.log({
      schema: this.schema(),
      data,
      currentDbVersion
    });
    const dataValidated = await this.schema()?.safeParseAsync(data);
    if (!dataValidated?.success) {
      console.error(dataValidated?.error, { dataValidated });
      throw new Error(parseZodError(dataValidated?.error));
    }
  }
  _analyzeDuplicates(data) {
    return new Promise((resolve, reject) => {
      this._indexDbService.search(this.storeName(), "name", data.name).then((result) => {
        if (result.length) {
          resolve({
            data: result,
            duplicate: true
          });
        } else {
          resolve({
            data: null,
            duplicate: false
          });
        }
      });
    });
  }
  static \u0275fac = function ImportComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportComponent)(\u0275\u0275directiveInject(CsvReaderService), \u0275\u0275directiveInject(DexieIndexDbService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImportComponent, selectors: [["lg-import"]], contentQueries: function ImportComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.rowTemplate, ImportRowTplDirective, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, viewQuery: function ImportComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.upload, UploadComponent, 5);
      \u0275\u0275viewQuery(DialogComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dialog = _t.first);
    }
  }, inputs: { label: "label", storeName: [1, "storeName"], schema: [1, "schema"], skipAllDuplicates: [1, "skipAllDuplicates"], replaceAll: [1, "replaceAll"] }, outputs: { onDone: "onDone", skipAllDuplicates: "skipAllDuplicatesChange", replaceAll: "replaceAllChange" }, decls: 23, vars: 33, consts: [["dialog", ""], [3, "filesSelected", "accept"], [3, "flat", "size"], [3, "onCancel", "onConfirm", "cancelButtonText", "confirmButtonText"], [3, "center", "hidden", "size"], ["type", "checkbox", 3, "change", "ngModelChange", "ngModel"], [3, "appendTarget", "targetElement"], [3, "size"], [1, "import-row"], [1, "import-row", 2, "margin-left", "16px", 3, "ngClass", "disabled", "skip"], ["type", "checkbox", 3, "ngModelChange", "ngModel", "disabled"], ["checked", "", "type", "checkbox", 3, "ngModelChange", "ngModel", "disabled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "import-row", 2, "margin-left", "16px", 3, "ngClass"]], template: function ImportComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "lg-upload", 1);
      \u0275\u0275listener("filesSelected", function ImportComponent_Template_lg_upload_filesSelected_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementStart(1, "lg-button", 2);
      \u0275\u0275text(2);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", null, 0)(6, "lg-dialog", 3);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275listener("onCancel", function ImportComponent_Template_lg_dialog_onCancel_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onClose());
      })("onConfirm", function ImportComponent_Template_lg_dialog_onConfirm_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onConfirm());
      });
      \u0275\u0275elementStart(9, "lg-flex-column");
      \u0275\u0275conditionalCreate(10, ImportComponent_Conditional_10_Template, 2, 3);
      \u0275\u0275pipe(11, "async");
      \u0275\u0275elementStart(12, "lg-flex-row", 4)(13, "input", 5);
      \u0275\u0275listener("change", function ImportComponent_Template_input_change_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSkipAllDuplicates());
      });
      \u0275\u0275twoWayListener("ngModelChange", function ImportComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.skipAllDuplicates, $event) || (ctx.skipAllDuplicates = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "label");
      \u0275\u0275text(15);
      \u0275\u0275pipe(16, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "lg-flex-row", 4)(18, "input", 5);
      \u0275\u0275listener("change", function ImportComponent_Template_input_change_18_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onReplaceAll());
      });
      \u0275\u0275twoWayListener("ngModelChange", function ImportComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.replaceAll, $event) || (ctx.replaceAll = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "label");
      \u0275\u0275text(20);
      \u0275\u0275pipe(21, "translate");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275element(22, "lg-portal", 6);
    }
    if (rf & 2) {
      let tmp_8_0;
      const dialog_r9 = \u0275\u0275reference(5);
      \u0275\u0275property("accept", ".json");
      \u0275\u0275advance();
      \u0275\u0275styleMap("solid");
      \u0275\u0275property("flat", true)("size", "small");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 21, ctx.label), " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("cancelButtonText", \u0275\u0275pipeBind1(7, 23, "close-label"))("confirmButtonText", \u0275\u0275pipeBind1(8, 25, "confirm-label"));
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_8_0 = \u0275\u0275pipeBind1(11, 27, ctx.data$)) ? 10 : -1, tmp_8_0);
      \u0275\u0275advance(2);
      \u0275\u0275property("center", true)("hidden", ctx.replaceAll())("size", "small");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.skipAllDuplicates);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 29, "skip-duplicates-label"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("center", true)("hidden", ctx.skipAllDuplicates())("size", "small");
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.replaceAll);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(21, 31, "replace-duplicates-label"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("appendTarget", "body")("targetElement", dialog_r9);
    }
  }, dependencies: [
    UploadComponent,
    ButtonComponent,
    DialogComponent,
    FlexRowComponent,
    FlexColumnComponent,
    FormsModule,
    CheckboxControlValueAccessor,
    NgControlStatus,
    NgModel,
    NgClass,
    NgTemplateOutlet,
    PortalComponent,
    AsyncPipe,
    TranslatePipe
  ], styles: ["\n\n.import-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 8px;\n  border: 1px solid #f5f5f5;\n  border-radius: 24px;\n  padding: 8px 16px;\n}\n.import-row.disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.import-row.skip[_ngcontent-%COMP%] {\n  border-color: #008ad8;\n  background-color: #dceaff;\n}\n.import-row.duplicated[_ngcontent-%COMP%] {\n  border-color: #ffbaba;\n  background-color: #fff4f4;\n}\n.import-row.update[_ngcontent-%COMP%] {\n  border-color: #8ca68c;\n  background-color: #e5f4e3;\n}\n.import-row.add[_ngcontent-%COMP%] {\n  border-color: #8ca68c;\n  background-color: #e5f4e3;\n}\n/*# sourceMappingURL=import.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImportComponent, [{
    type: Component,
    args: [{ selector: "lg-import", standalone: true, imports: [
      UploadComponent,
      ButtonComponent,
      DialogComponent,
      AsyncPipe,
      FlexRowComponent,
      FlexColumnComponent,
      FormsModule,
      NgClass,
      NgTemplateOutlet,
      PortalComponent,
      TranslatePipe
    ], template: `
    <lg-upload (filesSelected)="onFileSelected($event)" [accept]="'.json'">
      <lg-button [flat]="true"
                 [size]="'small'"
                 [style]="'solid'">
        {{ label|translate }}
      </lg-button>
    </lg-upload>

    <div #dialog>
      <lg-dialog (onCancel)="onClose()"
                 [cancelButtonText]="'close-label'|translate"
                 [confirmButtonText]="'confirm-label'|translate"
                 (onConfirm)="onConfirm()">
        <lg-flex-column>
          @if (data$ | async; as data) {
            @if (analize$ | async; as duplicates) {
              <lg-flex-column [size]="'medium'">
                @for (row of data; track row.name + row.uuid; let i = $index) {
                  <lg-flex-column [size]="'small'">

                    <div class="import-row"
                         [class.update]="rowsToUpdate[row.name]"
                         [class.add]="rowsToAdd[row.name]"
                         [class.disabled]="rowsToSkip[row.name]">

                      @if ((duplicates[row.uuid] || duplicates[row.name])) {
                        <input [(ngModel)]="rowsToUpdate[row.name]"
                               [disabled]="rowsToSkip[row.name]"
                               type="checkbox">
                        {{ 'update-label'|translate }}
                      } @else {
                        <input [(ngModel)]="rowsToAdd[row.name]"
                               [disabled]="rowsToSkip[row.name]"
                               checked
                               type="checkbox">
                        {{ 'add-label'|translate }}
                      }

                      @if (rowTemplate()) {
                        <ng-container
                          *ngTemplateOutlet="rowTemplate()!.templateRef; context: {$implicit: row, flow: 'new'}"></ng-container>
                      }

                    </div>

                    @if ((duplicates[row.uuid] || duplicates[row.name])) {
                      <div class="import-row"
                           [ngClass]="rowsToSkip[row.name] ? 'skip' : 'duplicated'"
                           [class.disabled]="rowsToUpdate[row.name]"
                           [class.skip]="rowsToUpdate[row.name]"
                           style="margin-left: 16px">
                        <input [(ngModel)]="rowsToSkip[row.name]"
                               [disabled]="rowsToAdd[row.name] || rowsToUpdate[row.name]"
                               type="checkbox">
                        <span>{{ (rowsToSkip[row.name] ? 'skip-label' : 'duplicates-label') | translate }}</span>
                        @if (rowTemplate()) {
                          <ng-container
                            *ngTemplateOutlet="rowTemplate()!.templateRef; context: {$implicit: (duplicates[row.uuid] || duplicates[row.name]), flow: 'old'}"></ng-container>
                        }
                      </div>
                    }
                  </lg-flex-column>
                }
              </lg-flex-column>
            }
          }

          <lg-flex-row [center]="true" [hidden]="replaceAll()" [size]="'small'">
            <input (change)="onSkipAllDuplicates()"
                   [(ngModel)]="skipAllDuplicates"
                   type="checkbox">
            <label>
              {{ 'skip-duplicates-label'|translate }}
            </label>
          </lg-flex-row>

          <lg-flex-row [center]="true" [hidden]="skipAllDuplicates()" [size]="'small'">
            <input (change)="onReplaceAll()" [(ngModel)]="replaceAll"
                   type="checkbox">
            <label>
              {{ 'replace-duplicates-label'|translate }}
            </label>
          </lg-flex-row>
        </lg-flex-column>
      </lg-dialog>
    </div>


    <lg-portal [appendTarget]="'body'" [targetElement]="dialog">

    </lg-portal>
  `, styles: ["/* angular:styles/component:scss;2aac9a6184e8eb3fa482f4bb4940aba0856923cbe10f63bd18fc8e9ddde1bb5e;/Users/khripunovpavel/Documents/my/lasagna/lasagna/src/app/shared/view/ui/import/import.component.ts */\n.import-row {\n  display: flex;\n  flex-direction: row;\n  gap: 8px;\n  border: 1px solid #f5f5f5;\n  border-radius: 24px;\n  padding: 8px 16px;\n}\n.import-row.disabled {\n  opacity: 0.5;\n}\n.import-row.skip {\n  border-color: #008ad8;\n  background-color: #dceaff;\n}\n.import-row.duplicated {\n  border-color: #ffbaba;\n  background-color: #fff4f4;\n}\n.import-row.update {\n  border-color: #8ca68c;\n  background-color: #e5f4e3;\n}\n.import-row.add {\n  border-color: #8ca68c;\n  background-color: #e5f4e3;\n}\n/*# sourceMappingURL=import.component.css.map */\n"] }]
  }], () => [{ type: CsvReaderService }, { type: DexieIndexDbService }], { label: [{
    type: Input
  }], dialog: [{
    type: ViewChild,
    args: [DialogComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImportComponent, { className: "ImportComponent", filePath: "src/app/shared/view/ui/import/import.component.ts", lineNumber: 165 });
})();

export {
  ImportRowTplDirective,
  ImportComponent
};
//# sourceMappingURL=chunk-BIEPUQKF.js.map
