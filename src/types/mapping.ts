import {KeysOfType} from "./util";

/**
 * A generic selection type which can either be a key or a function returning a property
 * @category Selection
 */
export type Selection<TModel, TProp> = MapFunc<TModel, TProp> | KeysOfType<TModel, TProp>;

/**
 * A method used for mapping a model to a single property.
 * Often used for defining properties in declarative syntax.
 * @category Mapping
 */
export type MapFunc<TModel, TProp> = ((x: TModel) => TProp);

/**
 * A function for mapping collection items
 * @category Mapping
 */
export type ArrayMapFunc<TModel, TProp> = ((x: TModel, i: number) => TProp);
