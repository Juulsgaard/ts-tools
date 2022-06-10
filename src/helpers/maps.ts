import {MapFunc} from "../types";

export type Lookup<TKey, TVal> = Map<TKey extends undefined ? null : TKey, TVal[]>;

/**
 * Map an array to a Map
 * @param array
 * @param getKey
 */
export function arrToMap<TArr, TKey>(array: TArr[], getKey: (x: TArr) => TKey): Map<TKey, TArr>
/**
 * Map an array to a Map
 * @param array
 * @param getKey
 * @param getVal
 */
export function arrToMap<TArr, TKey, TVal>(array: TArr[], getKey: (x: TArr) => TKey, getVal: (x: TArr) => TVal): Map<TKey, TVal>
export function arrToMap<TArr, TKey, TVal>(array: TArr[], getKey: (x: TArr) => TKey, getVal?: (x: TArr) => TVal): Map<TKey, TVal|TArr> {
  const map = new Map<TKey, TVal|TArr>();
  for (let item of array) {
    map.set(getKey(item), getVal ? getVal(item) : item);
  }
  return map;
} {

}

/**
 * Create a lookup where each key can map to multiple values
 * @param array
 * @param getKey
 */
export function arrToLookup<TArr, TKey, TVal>(array: TArr[], getKey: MapFunc<TArr, TKey>): Lookup<TKey, TArr>
/**
 * Create a lookup where each key can map to multiple values
 * @param array
 * @param getKey
 * @param getVal
 */
export function arrToLookup<TArr, TKey, TVal>(array: TArr[], getKey: MapFunc<TArr, TKey>, getVal: MapFunc<TArr, TVal>): Lookup<TKey, TVal>
export function arrToLookup<TArr, TKey, TVal>(array: TArr[], getKey: MapFunc<TArr, TKey>, getVal?: MapFunc<TArr, TVal>): Lookup<TKey, TVal|TArr> {
  const map = new Map<TKey, (TVal|TArr)[]>();

  for (let item of array) {
    const key = getKey(item);
    const val = getVal ? getVal(item) : item;
    const list = map.get(key);

    if (!list) {
      map.set(key, [val]);
      continue;
    }

    list.push(val);
  }

  return map as Lookup<TKey, TVal|TArr>;
}

/**
 * Iterate through a map and execute the callback for every element
 * @param map
 * @param callback
 */
export function iterateMap<TKey, TVal>(map: Map<TKey, TVal>, callback: (val: TVal, key: TKey) => void) {
  for (let [key, val] of map.entries()) {
    callback(val, key);
  }
}
