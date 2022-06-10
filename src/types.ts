export type KeysOfType<T, TProp> = { [P in keyof T]-?: T[P] extends TProp ? P : never }[keyof T];
export type ArrayType<T> = T extends (infer A)[] ? A : never;
export type Conditional<T, TBase, TTrue, TFalse = never> = T extends TBase ? TTrue : TFalse;

export type Selection<TModel, TProp> = MapFunc<TModel, TProp> | KeysOfType<TModel, TProp>;
export type MapFunc<TModel, TProp> = ((x: TModel) => TProp);

export type SortFn<TModel> = (a: TModel, b: TModel) => number;
export type SimpleObject = Record<string, any>;

export interface WithId {
  id: string;
}
