import {SortFn} from "../types";

/**
 * Alphabetically sort a string collection
 */
export function sortAlphAsc(): SortFn<number|undefined>;
/**
 * Alphabetically sort a collection based on a string
 * @param getString - Define the string mapper
 */
export function sortAlphAsc<T>(getString: (x: T) => string|undefined): SortFn<T>;
export function sortAlphAsc(getString?: (x: any) => string|undefined): SortFn<any> {
  if (!getString) return (a: string, b: string) => (a ?? '').localeCompare(b ?? '');
  return (a: any, b: any) => {
    const stringA = getString(a);
    const stringB = getString(b);
    return (stringA ?? '').localeCompare(stringB ?? '');
  }
}

/**
 * Alphabetically sort a string collection (Descending)
 */
export function sortAlphDesc(): SortFn<number|undefined>;
/**
 * Alphabetically sort a collection based on a string (Descending)
 * @param getString - Define the string mapper
 */
export function sortAlphDesc<T>(getString: (x: T) => string|undefined): SortFn<T>;
export function sortAlphDesc(getString?: (x: any) => string|undefined): SortFn<any> {
  if (!getString) return (a: string, b: string) => (b ?? '').localeCompare(a ?? '');
  return (a: any, b: any) => {
    const stringA = getString(a);
    const stringB = getString(b);
    return (stringB ?? '').localeCompare(stringA ?? '');
  }
}
