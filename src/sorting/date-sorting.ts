import {SortFn} from "../types";

/**
 * sort a Date collection
 */
export function sortDateAsc(): SortFn<Date|undefined>;
/**
 * sort a collection based on a Date
 * @param getDate - Define the Date mapper
 */
export function sortDateAsc<T extends object>(getDate: (x: T) => Date|undefined): SortFn<T>;
export function sortDateAsc(getDate?: (x: any) => Date|undefined): SortFn<any> {
    if (!getDate) return (a, b) => (a?.getTime() ?? 0) - (b?.getTime() ?? 0);
    return (a: any, b: any) => {
        const numA = getDate(a);
        const numB = getDate(b);
        return (numA?.getTime() ?? 0) - (numB?.getTime() ?? 0);
    }
}

/**
 * sort a Date collection (Descending)
 */
export function sortDateDesc(): SortFn<Date|undefined>;
/**
 * sort a collection based on a Date (Descending)
 * @param getDate - Define the Date mapper
 */
export function sortDateDesc<T extends object>(getDate: (x: T) => Date|undefined): SortFn<T>;
export function sortDateDesc(getDate?: (x: any) => Date|undefined): SortFn<any> {
    if (!getDate) return (a, b) => (b?.getTime() ?? 0) - (a?.getTime() ?? 0);
    return (a: any, b: any) => {
        const numA = getDate(a);
        const numB = getDate(b);
        return (numB?.getTime() ?? 0) - (numA?.getTime() ?? 0);
    }
}
