import {WithId} from "../types";

export function isObject(obj: any): obj is object {
  return obj != null && typeof obj === 'object';
}

export function isString(str: any): str is string {
  return typeof str === 'string';
}

export function isBool(bool: any): bool is boolean {
  return bool === true || bool === false;
}

export function hasId(obj: any): obj is WithId {
  return obj != null && 'id' in obj;
}
