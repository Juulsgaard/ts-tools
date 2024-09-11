import {SortFn} from "../types";


/**
 * sort a number collection
 * @category Sorting
 */
export function sortNumAsc(): SortFn<number|undefined>;
/**
 * sort a collection based on a number
 * @category Sorting
 * @param getNum - Define the number mapper
 */
export function sortNumAsc<T extends object>(getNum: (x: T) => number|undefined): SortFn<T>;
export function sortNumAsc(getNum?: (x: any) => number|undefined): SortFn<any> {
  if (!getNum) return (a, b) => (a ?? 0) - (b ?? 0);
  return (a: any, b: any) => {
    const numA = getNum(a);
    const numB = getNum(b);
    return (numA ?? 0) - (numB ?? 0);
  }
}

/**
 * sort a number collection (Descending)
 * @category Sorting
 */
export function sortNumDesc(): SortFn<number|undefined>;
/**
 * sort a collection based on a number (Descending)
 * @category Sorting
 * @param getNum - Define the number mapper
 */
export function sortNumDesc<T extends object>(getNum: (x: T) => number|undefined): SortFn<T>;
export function sortNumDesc(getNum?: (x: any) => number|undefined): SortFn<any> {
  if (!getNum) return (a, b) => (b ?? 0) - (a ?? 0);
  return (a: any, b: any) => {
    const numA = getNum(a);
    const numB = getNum(b);
    return (numB ?? 0) - (numA ?? 0);
  }
}
