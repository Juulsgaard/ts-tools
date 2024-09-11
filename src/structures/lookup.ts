
/**
 * An immutable collection where each key is unique but has a list of values
 * @category Lookups
 */
export class ReadonlyLookup<TKey, TVal> {

  protected noKey: TVal[]|undefined;
  protected values = new Map<NonNullable<TKey>, TVal[]>;

  /** The number of keys in the lookup */
  get size() {
    if (this.noKey == null) return this.values.size;
    return this.values.size + 1;
  }

  /** Get the list of values from a key */
  get(key: TKey): TVal[]|undefined {
    if (key == null) return this.noKey;
    return this.values.get(key);
  }

  /** Check if a key exists in the lookup */
  has(key: NonNullable<TKey>): boolean {
    if (key == null) return this.noKey != null;
    return this.values.has(key);
  }

  /** Iterate all keys and their values */
  forEach(callback: (value: TVal[], key: LookupKey<TKey>) => void) {
    for (const [key, value] of this) {
      callback(value, key);
    }
  };

  *[Symbol.iterator](): Generator<[key: LookupKey<TKey>, TVal[]]> {
    if (this.noKey != null) yield [undefined as LookupKey<TKey>, this.noKey];
    for (let [key, value] of this.values) {
      yield [key, value];
    }
  };
}

/**
 * A collection where each key is unique but has a list of values
 * @category Lookups
 */
export class Lookup<TKey, TVal> extends ReadonlyLookup<TKey, TVal> {

  /** Set the collection for a given key */
  set(key: TKey, value: TVal[]): this {
    if (key == null) this.noKey = value;
    else this.values.set(key, value);
    return this;
  }

  /** Clear the collection */
  clear(): void {
    this.values.clear();
    this.noKey = undefined;
  }

  /** Delete all values from a key */
  delete(key: TKey): boolean {
   if (key != null) return this.values.delete(key);
   if (this.noKey == null) return false;
   this.noKey = undefined;
   return true;
  }

  /** Add a value to the lookup */
  add(key: TKey, value: TVal): this {
    if (key == null) {
      if (this.noKey == null) this.noKey = [value];
      else this.noKey.push(value);
      return this;
    }

    const list = this.values.get(key);
    if (list) list.push(value);
    else this.values.set(key, [value]);
    return this;
  }
}

/**
 * Possible key values for a Lookup with values of type `T`
 * @category Lookups
 * */
export type LookupKey<T> = NonNullable<T> | (T extends undefined|null ? undefined : never);

