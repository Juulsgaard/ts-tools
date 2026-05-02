import {SortFn} from "../types";

/**
 * Combine multiple sorting algorithms in a prioritised order
 * @param sortFnList - A list of sorting functions
 * @category Sorting
 */
export function sortCombined<T>(...sortFnList: SortFn<T>[]): SortFn<T> {
  if (sortFnList.length <= 0) return (_a, _b) => 0;

  const functions = [...sortFnList];

  return (a, b) => {
    for (let fn of functions) {
      const result = fn(a, b);
      if (result != 0) return result;
    }
    return 0;
  };
}
