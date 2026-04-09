/**
 * An immutable collection where each key is unique but has a list of values
 * @category Lookups
 */
export class ReadonlyLookup<TKey, TVal> {

  protected noKey: TVal[] | undefined;
  protected map = new Map<NonNullable<TKey>, TVal[]>;

  /** The number of keys in the lookup */
  get size() {
    if (this.noKey == null) return this.map.size;
    return this.map.size + 1;
  }

  /** Get the list of values from a key */
  get(key: TKey): TVal[] | undefined {
    if (key == null) return this.noKey ? [...this.noKey] : undefined;
    const value = this.map.get(key);
    return value ? [...value] : undefined;
  }

  /** Check if a key exists in the lookup */
  has(key: TKey): boolean {
    if (key == null) return this.noKey != null;
    return this.map.has(key);
  }

  /** Return values with a nullish key */
  get nullKeyValues(): TVal[] { return this.noKey != null ? [...this.noKey] : []; }

  /** Return true if the lookup contains a nullish key */
  get hasNullKey(): boolean { return this.noKey != null; }

  /** Iterate all keys and their values */
  forEach(callback: (value: TVal[], key: LookupKey<TKey>) => void) {
    for (const [key, value] of this) {
      callback(value, key);
    }
  };

  /** Create iterator for values with a non-null key */
  * keyedEntries(): MapIterator<[key: NonNullable<TKey>, values: TVal[]]> {
    for (let [key, value] of this.map) {
      yield [key, [...value]];
    }
  }

  /** Create iterator for all values and their keys */
  * entries(): MapIterator<[key: LookupKey<TKey>, values: TVal[]]> {
    if (this.noKey != null) yield [undefined as LookupKey<TKey>, [...this.noKey]];
    yield* this.keyedEntries();
  };

  [Symbol.iterator](): MapIterator<[key: LookupKey<TKey>, values: TVal[]]> {
    return this.entries();
  };

  /**
   * Create an array containing the keys and values in the lookup.
   * Excludes nullable keys
   * @param excludeNullKeys - Exclude nullable keys when true
   */
  toArray(excludeNullKeys: true): [key: NonNullable<TKey>, values: TVal[]][];
  /**
   * Create an array containing the keys and values in the lookup.
   * @param excludeNullKeys - Exclude nullable keys when true
   */
  toArray(excludeNullKeys?: boolean): [key: LookupKey<TKey>, values: TVal[]][];
  toArray(excludeNullKeys?: boolean) {
    if (excludeNullKeys) return Array.from(this.keyedEntries());
    return Array.from(this);
  }

  /** Convert to Map */
  toMap(): Map<LookupKey<TKey>, TVal[]> {
    const map = new Map<LookupKey<TKey>, TVal[]>();
    this.forEach((value, key) => map.set(key, [...value]));
    return map;
  }

  /** Get all non-null keys */
  keys(): MapIterator<NonNullable<TKey>> {
    return this.map.keys();
  }

  /** Get all value arrays */
  * values(): MapIterator<TVal[]> {
    if (this.noKey != null) yield [...this.noKey];
    for (const value of this.map.values()) {
      yield [...value];
    }
  }
}

/**
 * A collection where each key is unique but has a list of values
 * @category Lookups
 */
export class Lookup<TKey, TVal> extends ReadonlyLookup<TKey, TVal> {

  /** Set the collection for a given key */
  set(key: TKey, value: TVal[]): this {
    if (key == null) {
      this.noKey = value;
      return this;
    }

    this.map.set(key, value);
    return this;
  }

  /** Clear the collection */
  clear(): void {
    this.map.clear();
    this.noKey = undefined;
  }

  /** Delete all values from a key */
  delete(key: TKey): boolean {
    if (key != null) return this.map.delete(key);
    if (this.noKey == null) return false;
    this.noKey = undefined;
    return true;
  }

  /** Add a value to the lookup */
  add(key: TKey, value: TVal): this {
    if (key == null) {
      if (this.noKey == null) {
        this.noKey = [value];
      } else {
        this.noKey.push(value);
      }
      return this;
    }

    const list = this.map.get(key);
    if (list) {
      list.push(value);
    } else {
      this.map.set(key, [value]);
    }
    return this;
  }

  /** Add a range of values to the lookup */
  addRange(key: TKey, values: TVal[]): this {
    values.forEach(x => this.add(key, x));
    return this;
  }
}

/**
 * Possible key values for a Lookup with values of type `T`
 * @category Lookups
 * */
export type LookupKey<T> = NonNullable<T> | (T extends undefined | null ? undefined : never);

