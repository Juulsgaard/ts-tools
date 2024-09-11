import {Disposable, MapFunc} from "../types";

/**
 * A data structure that maps items and caches results of the mapping for reuse to reduce calls to heavy mapping implementations.
 * @category Mapping
 */
export class ListMapCache<TIn, TOut> implements Disposable {

  private _cache = new Map<TIn, TOut>();

  mapList(list: Iterable<TIn>, mapFunc: MapFunc<TIn, TOut>): TOut[] {
    const result: TOut[] = [];
    const newCache = new Map<TIn, TOut>();

    for (let item of list) {
      const mapped = this._cache.has(item) ? this._cache.get(item)! : mapFunc(item);
      result.push(mapped);
      newCache.set(item, mapped);
    }

    this._cache.clear();
    this._cache = newCache;
    return result;
  }

  clear() {
    this._cache.clear();
  }

  dispose(): void {
    this.clear();
  }
}
