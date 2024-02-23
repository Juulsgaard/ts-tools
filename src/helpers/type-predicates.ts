import {WithId} from "../types";

export function isObject(obj: unknown): obj is object {
  return obj != null && typeof obj === 'object';
}

export function isString(str: unknown): str is string {
  return typeof str === 'string';
}

export function isNumber(num: unknown): num is number {
  return typeof num === 'number';
}

export function isBool(bool: unknown): bool is boolean {
  return bool === true || bool === false;
}

export function isArray(arr: unknown): arr is unknown[] {
  return Array.isArray(arr);
}

export function hasId(obj: unknown): obj is WithId {
  return isObject(obj) && 'id' in obj;
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}
