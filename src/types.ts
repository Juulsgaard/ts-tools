export type KeysOfType<T, TProp> = { [P in keyof T]-?: T[P] extends TProp ? P : never }[keyof T];
export type KeysOfTypeOrNull<T, TProp> = { [P in keyof T]-?: T[P] extends TProp|undefined ? P : never }[keyof T];
export type ValueOfKey<T, TKey extends keyof T> = NonNullable<T[TKey]>;
export type ArrayType<T> = T extends (infer A)[] ? A : never;
export type Conditional<T, TBase, TTrue, TFalse = never> = T extends TBase ? TTrue : TFalse;

export type Selection<TModel, TProp> = MapFunc<TModel, TProp> | KeysOfType<TModel, TProp>;
export type MapFunc<TModel, TProp> = ((x: TModel) => TProp);
export type ArrayMapFunc<TModel, TProp> = ((x: TModel, i: number) => TProp);

export type SortFn<TModel> = (a: TModel, b: TModel) => number;
export type SimpleObject = Record<string, any>;

type ConstrainedKeys<T extends {}, TConstraint extends {}> = {[K in keyof TConstraint]: K extends (keyof T) ? K : never}[keyof TConstraint];
export type Constrain<T extends {}, TConstraint extends {}> = {[K in ConstrainedKeys<T, TConstraint>]: T[K]}

export type UnsetPartial<T> = { [P in keyof T]?: undefined }
export type UnsetExtra<TBase, TFull> = UnsetPartial<Omit<TFull, keyof TBase>>;


export type Loadable<TBase, TFull> =
  TBase & UnsetExtra<TBase, TFull> |
  TBase & TFull;

export type Loadable2Exclusive<TBase, T1, T2> =
  (TBase & UnsetExtra<TBase, T1> & UnsetExtra<TBase, T2>) |
  (TBase & T1 & UnsetExtra<TBase & T1, T2>) |
  (TBase & T2 & UnsetExtra<TBase & T2, T1>);

export type Loadable2<TBase, T1, T2> =
  (TBase & UnsetExtra<TBase, T1> & UnsetExtra<TBase, T2>) |
  (TBase & T1 & UnsetExtra<TBase & T1, T2>) |
  (TBase & T2 & UnsetExtra<TBase & T2, T1>) |
  (TBase & T1 & T2);


export type DeepPartial<T> =
  NonNullable<T> extends Date | File ? T :
    NonNullable<T> extends (infer A)[] ? DeepPartial<A>[] :
      NonNullable<T> extends Record<string, any> ? { [K in keyof T]?: DeepPartial<T[K]> } :
        T;


export interface WithId {
  id: string;
}

export interface Disposable {
  dispose(): void;
}
