import {isObject} from "./type-predicates";

/**
 * Returns true if the object is empty
 * @param obj
 * @returns isEmpty
 */
export function objEmpty(obj: Record<string, any>): boolean {
  if (obj == null) return true;
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

/**
 * Iterate an object and trigger the callback for each element
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
 * Map an object to a new object
 * Filters out null values
 * @param obj
 * @param mapKey
 * @param mapVal
 */
export function mapObject<TItem, TOut>(
  obj: Record<string, TItem>,
  mapKey: (val: TItem, key: string) => string|undefined,
  mapVal: (val: TItem, key: string) => TOut|undefined
): Record<string, NonNullable<TOut>> {
  const result = {} as Record<string, NonNullable<TOut>>;
  for (let [key, val] of Object.entries(obj)) {
    const newKey = mapKey(val, key);
    if (newKey === undefined) continue;
    const newVal = mapVal(val, key);
    if (newVal === undefined) continue;
    result[newKey] = newVal as NonNullable<TOut>;
  }
  return result;
}

/**
 * Map an array to on object
 * @param arr
 * @param mapKey
 * @param mapVal
 */
export function arrToObj<TVal, TOut>(arr: TVal[], mapKey: (val: TVal) => string, mapVal: (val: TVal) => TOut): Record<string, TOut>;
/**
 * Map an array to an object
 * @param arr
 * @param mapKey
 */
export function arrToObj<TVal>(arr: TVal[], mapKey: (val: TVal) => string): Record<string, TVal>;
export function arrToObj<TVal, TOut>(
  arr: TVal[],
  mapKey: (val: TVal) => string,
  mapVal?: (val: TVal) => TOut
): Record<string, TVal|TOut> {

  const result = {} as Record<string, TVal|TOut>;
  for (let val of arr) {
    const newKey = mapKey(val);
    result[newKey] = mapVal ? mapVal(val) : val;
  }
  return result;
}

/**
 * Strictly compare 2 objects and all their nested properties
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
 * Apply freeze on an array and all elements and their properties
 * @param array
 */
export function deepFreeze<T>(array: T[]): ReadonlyArray<DeepReadonly<T>>;
/**
 * Apply freeze on an object and all nested properties
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

export type DeepReadonly<T> =
  T extends Function ? T :
    T extends (infer U)[] ? ReadonlyArray<DeepReadonly<U>> :
      T extends object ? { readonly [P in keyof T]: DeepReadonly<T[P]> } :
        T;

/**
 * Create a deep clone of an object and all it's properties
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
