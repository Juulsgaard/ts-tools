
/**
 * Get the values of a Map as an Array
 * @param map
 */
export function mapToArr<TVal, TKey, TOut>(map: ReadonlyMap<TKey, TVal>): TVal[]
/**
 * Map a Map to an Array
 * @param map
 * @param mapFn
 */
export function mapToArr<TVal, TKey, TOut>(map: ReadonlyMap<TKey, TVal>, mapFn: (val: TVal, key: TKey) => TOut): TOut[]
export function mapToArr<TVal, TKey, TOut>(map: ReadonlyMap<TKey, TVal>, mapFn?: (val: TVal, key: TKey) => TOut): (TOut|TVal)[] {
  if (!mapFn) return Array.from(map.values());
  const result = [] as TOut[];
  for (let [key, val] of map) {
    result.push(mapFn(val, key));
  }
  return result;
}

/**
 * Convert a Set to an Array
 * @param set
 */
export function setToArr<TSet, TOut>(set: ReadonlySet<TSet>): TSet[]
/**
 * Map a Set to an Array
 * @param set
 * @param map
 */
export function setToArr<TSet, TOut>(set: ReadonlySet<TSet>, map: (val: TSet) => TOut): TOut[]
export function setToArr<TSet, TOut>(set: ReadonlySet<TSet>, map?: (val: TSet) => TOut): (TSet|TOut)[] {
  if (!map) return Array.from(set);
  const result = [] as TOut[];
  for (let val of set) {
    result.push(map(val));
  }
  return result;
}

/**
 * Get the values of an Object as an Array
 * @param obj
 */
export function objToArr<TKey extends string|number, TVal, TOut>(obj: Record<TKey, TVal>): TVal[]
/**
 * Map an Object to an Array
 * @param obj
 * @param mapFn
 */
export function objToArr<TKey extends string|number, TVal, TOut>(obj: Record<TKey, TVal>, mapFn: (val: TVal, key: TKey) => TOut): TOut[]
export function objToArr<TKey extends string|number, TVal, TOut>(obj: Record<TKey, TVal>, mapFn?: (val: TVal, key: TKey) => TOut): (TOut|TVal)[] {
  if (!mapFn) return Object.values(obj);

  const result = [] as (TOut)[];
  for (let key in obj) {
    const val = obj[key];
    result.push(mapFn(val, key));
  }
  return result;
}

/**
 * Map an array and filter out any undefined values
 * @param arr
 * @param map
 */
export function mapArrNotNull<TVal, TOut>(arr: ReadonlyArray<TVal>, map: (val: TVal, index: number) => TOut|undefined|null): NonNullable<TOut>[] {
  const result = [] as NonNullable<TOut>[];
  let index = 0;
  for (let val of arr) {
    const newVal = map(val, index++);
    if (newVal == null) continue;
    result.push(newVal as NonNullable<TOut>);
  }
  return result;
}
