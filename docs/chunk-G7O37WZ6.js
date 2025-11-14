import {
  getUnitMarker
} from "./chunk-JVOZ4YPY.js";
import {
  Pipe,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/view/pipes/unitString.pipe.ts
var UnitStringPipe = class _UnitStringPipe {
  transform(value) {
    return getUnitMarker(value);
  }
  static \u0275fac = function UnitStringPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitStringPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "unitString", type: _UnitStringPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitStringPipe, [{
    type: Pipe,
    args: [{
      name: "unitString",
      standalone: true
    }]
  }], null, null);
})();

export {
  UnitStringPipe
};
//# sourceMappingURL=chunk-G7O37WZ6.js.map
