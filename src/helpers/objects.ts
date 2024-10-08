import {isObject} from "./type-predicates";
import {ArrayMapFunc} from "../types";

/**
 * Returns true if the object is empty
 * @category Object Tools
 * @param obj
 * @returns isEmpty
 */
export function objEmpty(obj: Record<string, any>): boolean {
  if (obj == null) return true;
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

/**
 * Iterate an object and trigger the callback for each element
 * @category Object Tools
 * @param obj - Target object
 * @param callback
 */
export function iterateObj<TItem>(obj: Record<string, TItem>, callback: (x: TItem, key: string, index: number) => void) {
  let index = 0;
  for (const [key, value] of Object.entries(obj)) {
    callback(value, key, index);
    index++;
  }
}

/**
 * Map an object to a new object.
 * Filters out null values
 * @category Object Tools
 * @param obj
 * @param mapVal
 * @param mapKey
 */
export function mapObj<TItem, TOut>(
  obj: Record<string, TItem>,
  mapVal: (val: TItem, key: string) => (TOut | undefined),
  mapKey: (val: TItem, key: string) => (string | undefined)
): Record<string, NonNullable<TOut>>
/**
 * Map an object to a new object.
 * Filters out null values
 * @category Object Tools
 * @param obj
 * @param mapVal
 */
export function mapObj<TItem, TOut>(
  obj: Record<string, TItem>,
  mapVal: (val: TItem, key: string) => TOut|undefined
): Record<string, NonNullable<TOut>>
export function mapObj<TItem, TOut>(
  obj: Record<string, TItem>,
  mapVal: (val: TItem, key: string) => (TOut | undefined),
  mapKey?: (val: TItem, key: string) => (string | undefined)
): Record<string, NonNullable<TOut>> {
  const result = {} as Record<string, NonNullable<TOut>>;
  for (let [key, val] of Object.entries(obj)) {
    const newKey = mapKey ? mapKey(val, key) : key;
    if (newKey === undefined) continue;
    const newVal = mapVal(val, key);
    if (newVal === undefined) continue;
    result[newKey] = newVal as NonNullable<TOut>;
  }
  return result;
}

/**
 * Map an array to on object
 * @category Object Tools
 * @param arr
 * @param mapKey
 * @param mapVal
 */
export function arrToObj<TVal, TOut>(arr: ReadonlyArray<TVal>, mapKey: ArrayMapFunc<TVal, string>, mapVal: ArrayMapFunc<TVal, TOut>): Record<string, TOut>;
/**
 * Map an array to an object
 * @category Object Tools
 * @param arr
 * @param mapKey
 */
export function arrToObj<TVal>(arr: ReadonlyArray<TVal>, mapKey: ArrayMapFunc<TVal, string>): Record<string, TVal>;
export function arrToObj<TVal, TOut>(
  arr: ReadonlyArray<TVal>,
  mapKey: ArrayMapFunc<TVal, string>,
  mapVal?: ArrayMapFunc<TVal, TOut>
): Record<string, TVal|TOut> {

  const result = {} as Record<string, TVal|TOut>;
  let index = 0;
  for (let val of arr) {
    const newKey = mapKey(val, index);
    result[newKey] = mapVal ? mapVal(val, index) : val;
    index++;
  }
  return result;
}

/**
 * Strictly compare 2 objects and all their nested properties
 * @category Object Tools
 * @param item1
 * @param item2
 */
export function deepEquals<T>(item1: T, item2: T) {

  if (typeof item1 !== typeof item2) return false;
  if (item1 == null) return item2 == null;
  if (item2 == null) return false;

  if (Array.isArray(item1)) {
    if (!Array.isArray(item2)) return false;
    if (item1.length !== item2.length) return false;
    for (let i = 0; i < item1.length; i++) {
      if (!deepEquals(item1[i], item2[i])) return false;
    }
    return true;
  }

  if (item1 instanceof Date && item2 instanceof Date) {
    return item1.getTime() === item2.getTime();
  }

  if (isObject(item1)) {
    if (!isObject(item2)) return false;
    if (Object.keys(item1).length !== Object.keys(item2).length) return false;
    for (const key in item1) {
      if (!item1.hasOwnProperty(key)) continue;
      if (!item2.hasOwnProperty(key)) return false;
      if (!deepEquals(item1[key], item2[key])) return false;
    }
    return true;
  }
  return item1 === item2;
}

/**
 * Compare 2 objects or arrays by comparing elements to each other
 * @category Object Tools
 * @param item1
 * @param item2
 */
export function shallowEquals(item1: Record<string, unknown>|unknown[], item2: Record<string, unknown>|unknown[]): boolean {

  if (Array.isArray(item1)) {
    if (!Array.isArray(item2)) return false;
    if (item1.length !== item2.length) return false;
    for (let i = 0; i < item1.length; i++) {
      if (item1[i] !== item2[i]) return false;
    }
    return true;
  }

  if (Array.isArray(item2)) return false;

  if (Object.keys(item1).length !== Object.keys(item2).length) return false;
  for (let key in item1) {
    if (!item1.hasOwnProperty(key)) continue;
    if (!item2.hasOwnProperty(key)) return false;
    if (item1[key] !== item2[key]) return false;
  }
  return true;
}

/**
 * Apply freeze on an array and all elements and their properties
 * @category Object Tools
 * @param array
 */
export function deepFreeze<T>(array: ReadonlyArray<T>): ReadonlyArray<DeepReadonly<T>>;
/**
 * Apply freeze on an object and all nested properties
 * @category Object Tools
 * @param obj
 */
export function deepFreeze<T extends object>(obj: T): DeepReadonly<T>;
export function deepFreeze<T>(data: T): DeepReadonly<T> {
  if (data == null) return data as DeepReadonly<T>;
  if (data instanceof Function) return Object.freeze(data) as DeepReadonly<T>;

  if (isObject(data)) {
    for (let key in data) {
      if (!data.hasOwnProperty(key)) continue;
      const val = data[key];
      if (val == null) continue;
      if (val instanceof Function || isObject(val)) deepFreeze(val);
    }
  }

  if (Object.isFrozen(data)) return data as DeepReadonly<T>;
  return Object.freeze(data) as DeepReadonly<T>;
}

/**
 * A type where all properties are recursively set to readonly
 * @category Object Tools
 */
export type DeepReadonly<T> =
  T extends Function ? T :
    T extends (infer U)[] ? ReadonlyArray<DeepReadonly<U>> :
      T extends object ? { readonly [P in keyof T]: DeepReadonly<T[P]> } :
        T;

/**
 * Create a deep clone of an object and all it's properties
 * @category Object Tools
 * @param source
 */
export function deepCopy<T>(source: T): T {

  if (source === undefined) return undefined!;
  if (source === null) return null!;

  if (source instanceof Date) {
    return new Date(source.getTime()) as any;
  }

  if (source instanceof Set) {
    const ret = new Set() as typeof source;
    for (let val of source) {
      ret.add(val);
    }
    return ret;
  }

  if (source instanceof Map) {
    const ret = new Map() as typeof source;
    for (let [key, val] of source) {
      ret.set(key, val);
    }
    return ret;
  }

  if (Array.isArray(source)) {
    return source.map(x => deepCopy(x)) as any;
  }

  if (isObject(source)) {
    const ret: any = {};
    for (let [key, val] of Object.entries(source)) {
      ret[key] = deepCopy(val)
    }
    return ret;
  }

  return source;
}
