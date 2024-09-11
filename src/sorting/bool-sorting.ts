import {SortFn} from "../types";

/**
 * sort a boolean collection
 * @category Sorting
 */
export function sortBoolAsc(): SortFn<boolean|undefined>;
/**
 * sort a collection based on a boolean
 * @category Sorting
 * @param getBool - Define the boolean mapper
 */
export function sortBoolAsc<T>(getBool: (x: T) => boolean|undefined): SortFn<T>;
export function sortBoolAsc(getBool?: (x: any) => boolean|undefined): SortFn<any> {
    if (!getBool) return (a, b) => a ? (b ? 0 : 1) : (b ? -1 : 0);
    return (a: any, b: any) => {
        const boolA = getBool(a);
        const boolB = getBool(b);
        return boolA ? (boolB ? 0 : 1) : (boolB ? -1 : 0);
    }
}

/**
 * sort a boolean collection (Descending)
 * @category Sorting
 */
export function sortBoolDesc(): SortFn<boolean|undefined>;
/**
 * sort a collection based on a boolean (Descending)
 * @category Sorting
 * @param getBool - Define the boolean mapper
 */
export function sortBoolDesc<T>(getBool: (x: T) => boolean|undefined): SortFn<T>;
export function sortBoolDesc(getBool?: (x: any) => boolean|undefined): SortFn<any> {
    if (!getBool) return (a, b) => b ? (a ? 0 : 1) : (a ? -1 : 0);
    return (a: any, b: any) => {
        const boolA = getBool(a);
        const boolB = getBool(b);
        return boolB ? (boolA ? 0 : 1) : (boolA ? -1 : 0);
    }
}
