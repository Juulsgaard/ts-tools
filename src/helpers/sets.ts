/**
 * Convert an array to a set
 * @param arr
 */
import {ArrayMapFunc} from "../types";

export function arrToSet<TArr>(arr: TArr[]): Set<TArr>;
/**
 * Map an array to a set
 * @param arr
 * @param map
 */
export function arrToSet<TArr, TSet>(arr: TArr[], map: ArrayMapFunc<TArr, TSet>): Set<TSet>
export function arrToSet<TArr, TSet>(arr: TArr[], map?: ArrayMapFunc<TArr, TSet>): Set<TSet|TArr> {
  if (!map) return new Set<TArr>(arr);

  const result = new Set<TSet>;
  let index = 0;
  for (let val of arr) {
    result.add(map(val, index++));
  }
  return result;
}

/**
 * Shallow clone a Set
 * @param set
 */
export function cloneSet<TVal>(set: Set<TVal>): Set<TVal> {
  return new Set<TVal>(set);
}
