import {
  SortResult
} from "./chunk-UO3JCBBV.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-Z5TNFCCP.js";

// src/app/shared/service/services/grouping-sorting.service.ts
var GroupSortService = class _GroupSortService {
  async groupItems(items, strategy, direction = "asc", field = "name") {
    const groupsMap = /* @__PURE__ */ new Map();
    const checkFn = (key, item) => {
      if (!groupsMap.has(key)) {
        groupsMap.set(key, []);
      }
      groupsMap.get(key).push(item);
    };
    for (const item of items) {
      const key = strategy.groupBy(item);
      if (Array.isArray(key)) {
        for (const subKey of key) {
          checkFn(subKey, item);
        }
      } else {
        checkFn(key, item);
      }
    }
    const result = [];
    for (const [name, groupItems] of groupsMap.entries()) {
      let sortedItems = groupItems;
      if (strategy.innerSort) {
        sortedItems = groupItems.toSorted((a, b) => {
          return strategy.innerSort?.(a, b, direction, field) || 0;
        });
      }
      const fieldName = strategy?.fieldTransform ? await strategy.fieldTransform(name) : name;
      result.push({ field: fieldName, items: sortedItems });
    }
    return new SortResult(result.toSorted((a, b) => {
      if (strategy.groupingSort) {
        return strategy.groupingSort(a.field, b.field, direction);
      }
      if (a.field === "" && b.field !== "") {
        return 1;
      } else if (b.field === "" && a.field !== "") {
        return -1;
      }
      return a.field.localeCompare(b.field);
    }));
  }
  static \u0275fac = function GroupSortService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupSortService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GroupSortService, factory: _GroupSortService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupSortService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  GroupSortService
};
//# sourceMappingURL=chunk-MFMKMC64.js.map
