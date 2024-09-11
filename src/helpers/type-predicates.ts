import {WithId} from "../types";

/** @category Type Predicates */
export function isObject(obj: unknown): obj is object {
  return obj != null && typeof obj === 'object';
}

/** @category Type Predicates */
export function isString(str: unknown): str is string {
  return typeof str === 'string';
}

/** @category Type Predicates */
export function isNumber(num: unknown): num is number {
  return typeof num === 'number';
}

/** @category Type Predicates */
export function isBool(bool: unknown): bool is boolean {
  return bool === true || bool === false;
}

/** @category Type Predicates */
export function isArray(arr: unknown): arr is unknown[] {
  return Array.isArray(arr);
}

/** @category Type Predicates */
export function hasId(obj: unknown): obj is WithId {
  return isObject(obj) && 'id' in obj;
}

/** @category Type Predicates */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}
