import {ArrayMapFunc} from "../types";
import {Lookup} from "../structures/lookup";

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
export function arrToLookup<TArr, TKey, TVal>(
  array: TArr[],
  getKey: ArrayMapFunc<TArr, TKey>,
  getVal: ArrayMapFunc<TArr, TVal>
): Lookup<TKey, TVal>
export function arrToLookup<TArr, TKey, TVal>(
  array: TArr[],
  getKey: ArrayMapFunc<TArr, TKey>,
  getVal?: ArrayMapFunc<TArr, TVal>
): Lookup<TKey, TVal | TArr> {

  const lookup = new Lookup<TKey, TVal | TArr>();

  let index = 0;
  for (let item of array) {
    const key = getKey(item, index);
    const val = getVal ? getVal(item, index) : item;
    lookup.add(key, val);
    index++;
  }

  return lookup;
}
