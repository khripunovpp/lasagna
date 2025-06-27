import * as _ from "lodash";
export const deepClone = <T>(obj: T): T => {
  return _.cloneDeep(obj) as T;
}
