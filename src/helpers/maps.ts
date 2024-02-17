import {ArrayMapFunc} from "../types";

/**
 * Map an array to a Map
 * @param array
 * @param getKey
 */
export function arrToMap<TArr, TKey>(array: ReadonlyArray<TArr>, getKey: ArrayMapFunc<TArr, TKey>): Map<TKey, TArr>
/**
 * Map an array to a Map
 * @param array
 * @param getKey
 * @param getVal
 */
export function arrToMap<TArr, TKey, TVal>(array: ReadonlyArray<TArr>, getKey: ArrayMapFunc<TArr, TKey>, getVal: ArrayMapFunc<TArr, TVal>): Map<TKey, TVal>
export function arrToMap<TArr, TKey, TVal>(array: ReadonlyArray<TArr>, getKey: ArrayMapFunc<TArr, TKey>, getVal?: ArrayMapFunc<TArr, TVal>): Map<TKey, TVal|TArr> {
  const map = new Map<TKey, TVal|TArr>();
  let index = 0;
  for (let item of array) {
    map.set(getKey(item, index), getVal ? getVal(item, index) : item);
    index++;
  }
  return map;
}

/** Map an object to a Map */
export function objToMap<TKey extends string|number, TVal, TOutKey, TOut>(obj: Record<TKey, TVal>, mapKey: (val: TVal, key: TKey) => TOutKey, mapVal: (val: TVal, key: TKey) => TOut): Map<TOutKey, TOut>
/** Map an object to a Map */
export function objToMap<TKey extends string|number, TVal, TOut>(obj: Record<TKey, TVal>, mapKey: null, mapVal: (val: TVal, key: TKey) => TOut): Map<TKey, TOut>
/** Map an object to a Map */
export function objToMap<TKey extends string|number, TVal, TOutKey>(obj: Record<TKey, TVal>, mapKey: (val: TVal, key: TKey) => TOutKey): Map<TOutKey, TVal>
/** Map an object to a Map */
export function objToMap<TKey extends string|number, TVal>(obj: Record<TKey, TVal>): Map<TKey, TVal>
export function objToMap<TKey extends string|number, TVal, TOutKey, TOut>(obj: Record<TKey, TVal>, mapKey?: ((val: TVal, key: TKey) => TOutKey)|null, mapVal?: (val: TVal, key: TKey) => TOut): Map<TOutKey|TKey, TOut|TVal> {
  const map = new Map<TOutKey|TKey, TOut|TVal>();
  for (let key in obj) {
    const val = obj[key];
    map.set(
      mapKey ? mapKey(val, key) : key,
      mapVal ? mapVal(val, key) : val
    );
  }
  return map;
}

/**
 * Iterate through a map and execute the callback for every element
 * @param map
 * @param callback
 */
export function iterateMap<TKey, TVal>(map: ReadonlyMap<TKey, TVal>, callback: (val: TVal, key: TKey) => void) {
  for (let [key, val] of map.entries()) {
    callback(val, key);
  }
}
