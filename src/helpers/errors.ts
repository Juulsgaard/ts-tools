import {isObject, isString} from "./type-predicates";

/**
 * Parse errors into an Error object
 * @category Error Handling
 * @param error - The thrown error
 * @private
 */
export function parseError(error: Error | unknown): Error {
  if (error == null) return Error();
  if (error instanceof Error) return error;
  if (isString(error)) return Error(error);
  if (!isObject(error)) return Error(error.toString());
  if ('message' in error && isString(error.message)) return Error(error.message);
  if ('error' in error && isString(error.error)) return Error(error.error);
  return Error(error.toString());
}
