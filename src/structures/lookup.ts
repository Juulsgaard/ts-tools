

export class ReadonlyLookup<TKey, TVal> {

  protected noKey: TVal[]|undefined;
  protected values = new Map<NonNullable<TKey>, TVal[]>;

  get size() {
    if (this.noKey == null) return this.values.size;
    return this.values.size + 1;
  }

  get(key: TKey): TVal[]|undefined {
    if (key == null) return this.noKey;
    return this.values.get(key);
  }

  has(key: NonNullable<TKey>): boolean {
    if (key == null) return this.noKey != null;
    return this.values.has(key);
  }

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

export class Lookup<TKey, TVal> extends ReadonlyLookup<TKey, TVal> {

  set(key: TKey, value: TVal[]): this {
    if (key == null) this.noKey = value;
    else this.values.set(key, value);
    return this;
  }

  clear(): void {
    this.values.clear();
    this.noKey = undefined;
  }

  delete(key: TKey): boolean {
   if (key != null) return this.values.delete(key);
   if (this.noKey == null) return false;
   this.noKey = undefined;
   return true;
  }

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

export type LookupKey<T> = NonNullable<T> | (T extends undefined|null ? undefined : never);

