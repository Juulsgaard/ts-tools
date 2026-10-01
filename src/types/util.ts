
/**
 * All keys of a type with properties of type `TProp`
 * @category Util Types
 */
export type KeysOfType<T, TProp> = { [P in keyof T]-?: T[P] extends TProp ? P : never }[keyof T];

/**
 * All keys of a type with properties of type `TProp` or `TProp|undefined`
 * @category Util Types
 */
export type KeysOfTypeOrNull<T, TProp> = { [P in keyof T]-?: T[P] extends TProp|undefined ? P : never }[keyof T];

/**
 * The non-nullable type of property `T`
 * @category Util Types
 */
export type ValueOfKey<T, TKey extends keyof T> = NonNullable<T[TKey]>;


/**
 * The item type of Array `T`
 * @category Util Types
 */
export type ArrayType<T> = T extends ReadonlyArray<infer A> ? A : never;

/**
 * If `T` extends `TBase` then this type evaluates to `TTrue`, otherwise to `TFalse` or `never`
 * @category Util Types
 */
export type Conditional<T, TBase, TTrue, TFalse = never> = T extends TBase ? TTrue : TFalse;


/**
 * A type where all properties are made optional and with no value
 * @category Util Types
 */
export type UnsetPartial<T> = { [P in keyof T]?: undefined }
/**
 * A type where all properties of `TFull` that are not in `TBase` are made optional and with no value
 * @category Util Types
 */
export type UnsetExtra<TBase, TFull> = UnsetPartial<Omit<TFull, keyof TBase>>;

/**
 * Recursively makes all properties optional
 * @category Util Types
 */
export type DeepPartial<T> =
  T extends ValueObjectExtended ? T :
    T extends ReadonlyArray<infer U> ? DeepPartial<U>[] :
      T extends Record<string, any> ? { [K in keyof T]?: DeepPartial<T[K]> } :
        T;


type ConstrainedKeys<T extends {}, TConstraint extends {}> = {[K in keyof TConstraint]: K extends (keyof T) ? K : never}[keyof TConstraint];
/**
 * Creates a Type that is a subset of `T` containing only properties also found in `TConstraint`
 * @category Util Types
 */
export type Constrain<T extends {}, TConstraint extends {}> = {[K in ConstrainedKeys<T, TConstraint>]: T[K]}

/**
 * Creates a Type where no properties are readonly
 * @category Util Types
 */
export type Mutable<T> = {-readonly [K in keyof T]: T[K]};

/**
 * A Record with string keys
 * @category Util Types
 */
export type SimpleObject = Record<string, any>;

/**
 * Types that extend Record<string, any>, but are typically seen as values rater than objects
 * @category Util Types
 */
export type ValueObject = Date|File|Blob;

/**
 * Types that extend Record<string, any>, but are typically seen as values rater than objects.
 * This list includes maps and sets in addition to the base list
 * @category Util Types
 */
export type ValueObjectExtended = ValueObject|ReadonlyMap<any, any>|ReadonlySet<any>;
