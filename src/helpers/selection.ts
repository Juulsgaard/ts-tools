import {Selection} from "../types";

/**
 * Apply a selector
 * @param data
 * @param selector
 */
export function applySelector<TModel, TProp>(data: TModel, selector: Selection<TModel, TProp>): TProp {
  return selector instanceof Function ? selector(data) as TProp : data[selector] as unknown as TProp;
}

/**
 * Generate a selector method from a selector
 * @param selector
 */
export function getSelectorFn<TModel, TProp>(selector: Selection<TModel, TProp>): (model: TModel) => TProp {
  return selector instanceof Function
    ? selector
    : data => data[selector] as unknown as TProp;
}
