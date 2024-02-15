

export class ReadOnlyLookup<TKey, TVal> {

  protected noKey: TVal[]|undefined;
  protected values = new Map<NonNullable<TKey>, TVal[]>;

  get(key: TKey): TVal[]|undefined {
    if (key == null) return this.noKey;
    return this.values.get(key);
  }

  has(key: NonNullable<TKey>): boolean {
    if (key == null) return this.noKey != null;
    return this.values.has(key);
  }

  forEach(callback: (value: TVal[], key: NonNullable<TKey>|undefined) => void) {
    if (this.noKey != null) callback(this.noKey, undefined);
    this.values.forEach(callback);
  };
}

export class Lookup<TKey, TVal> extends ReadOnlyLookup<TKey, TVal> {

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

