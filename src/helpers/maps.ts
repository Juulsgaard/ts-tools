import {ArrayMapFunc, MapFunc} from "../types";

export type Lookup<TKey, TVal> = Map<TKey extends undefined ? null : TKey, TVal[]>;

/**
 * Map an array to a Map
 * @param array
 * @param getKey
 */
export function arrToMap<TArr, TKey>(array: TArr[], getKey: ArrayMapFunc<TArr, TKey>): Map<TKey, TArr>
/**
 * Map an array to a Map
 * @param array
 * @param getKey
 * @param getVal
 */
export function arrToMap<TArr, TKey, TVal>(array: TArr[], getKey: ArrayMapFunc<TArr, TKey>, getVal: ArrayMapFunc<TArr, TVal>): Map<TKey, TVal>
export function arrToMap<TArr, TKey, TVal>(array: TArr[], getKey: ArrayMapFunc<TArr, TKey>, getVal?: ArrayMapFunc<TArr, TVal>): Map<TKey, TVal|TArr> {
  const map = new Map<TKey, TVal|TArr>();
  let index = 0;
  for (let item of array) {
    map.set(getKey(item, index), getVal ? getVal(item, index) : item);
    index++;
  }
  return map;
}

/** Map an object to a Map */
export function objToMap<TVal, TKey, TOut>(obj: Record<string, TVal>, mapKey: (val: TVal, key: string) => TKey, mapVal: (val: TVal, key: string) => TOut): Map<TKey, TOut>
/** Map an object to a Map */
export function objToMap<TVal, TOut>(obj: Record<string, TVal>, mapKey: null, mapVal: (val: TVal, key: string) => TOut): Map<string, TOut>
/** Map an object to a Map */
export function objToMap<TVal, TKey>(obj: Record<string, TVal>, mapKey: (val: TVal, key: string) => TKey): Map<TKey, TVal>
/** Map an object to a Map */
export function objToMap<TVal>(obj: Record<string, TVal>): Map<string, TVal>
export function objToMap<TVal, TKey, TOut>(obj: Record<string, TVal>, mapKey?: ((val: TVal, key: string) => TKey)|null, mapVal?: (val: TVal, key: string) => TOut): Map<TKey|string, TOut|TVal> {
  const map = new Map<TKey|string, TOut|TVal>();
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
 * Create a lookup where each key can map to multiple values
 * @param array
 * @param getKey
 */
export function arrToLookup<TArr, TKey, TVal>(array: TArr[], getKey: ArrayMapFunc<TArr, TKey>): Lookup<TKey, TArr>
/**
 * Create a lookup where each key can map to multiple values
 * @param array
 * @param getKey
 * @param getVal
 */
export function arrToLookup<TArr, TKey, TVal>(array: TArr[], getKey: ArrayMapFunc<TArr, TKey>, getVal: ArrayMapFunc<TArr, TVal>): Lookup<TKey, TVal>
export function arrToLookup<TArr, TKey, TVal>(array: TArr[], getKey: ArrayMapFunc<TArr, TKey>, getVal?: ArrayMapFunc<TArr, TVal>): Lookup<TKey, TVal|TArr> {
  const map = new Map() as Lookup<TKey, TVal|TArr>;

  let index = 0;
  for (let item of array) {
    const key = (getKey(item, index) ?? null) as TKey extends undefined ? null : TKey;
    const val = getVal ? getVal(item, index) : item;
    const list = map.get(key);
    index++;

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
