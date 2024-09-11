import {UnsetExtra} from "./util";

/**
 * Creates a dynamic type that always consists of the `TBase` type, and optionally contains `TFull` as well.
 * Used for scenarios where parts of a data structure are lazy-loaded.
 * @category Loadable Types
 */
export type Loadable<TBase, TFull> =
  TBase & UnsetExtra<TBase, TFull> |
  TBase & TFull;

/**
 * Creates a dynamic type that always consists of the `TBase` type, and optionally contains either `T1` or `T2` as well.
 * Used for scenarios where parts of a data structure are lazy-loaded with one of two possible models.
 * @category Loadable Types
 */
export type Loadable2Exclusive<TBase, T1, T2> =
  (TBase & UnsetExtra<TBase, T1> & UnsetExtra<TBase, T2>) |
  (TBase & T1 & UnsetExtra<TBase & T1, T2>) |
  (TBase & T2 & UnsetExtra<TBase & T2, T1>);

/**
 * Creates a dynamic type that always consists of the `TBase` type, and optionally contains `T1` and/or `T2` as well.
 * Used for scenarios where parts of a data structure are lazy-loaded and where the base model might be extended in two separate ways.
 * @category Loadable Types
 */
export type Loadable2<TBase, T1, T2> =
  (TBase & UnsetExtra<TBase, T1> & UnsetExtra<TBase, T2>) |
  (TBase & T1 & UnsetExtra<TBase & T1, T2>) |
  (TBase & T2 & UnsetExtra<TBase & T2, T1>) |
  (TBase & T1 & T2);
