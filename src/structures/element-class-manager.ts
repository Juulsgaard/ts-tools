import {isArray, isString} from "../helpers/type-predicates";

export type ElementClasses = string[] | Record<string, boolean> | string | undefined | null;

export function processElementClasses(classes: ElementClasses): string[] {
  if (classes == null) return [];
  if (isString(classes)) return [classes];
  if (isArray(classes)) return classes;

  const out: string[] = [];
  for (let c in classes) {
    if (!classes[c]) continue;
    out.push(c);
  }
  return out;
}

export class ElementClassManager<T extends HTMLElement = HTMLElement> {
  private readonly _classes = new Set<string>();
  get classes(): ReadonlySet<string> {
    return this._classes
  };

  constructor(readonly element: T, initialClasses?: ElementClasses) {
    this._classes = new Set<string>(processElementClasses(initialClasses));
    this.element.classList.add(...this.classes);
  }

  set(classes: ElementClasses) {
    const current = new Set(this.classes);
    const toSet = processElementClasses(classes);

    for (let c of toSet) {
      const exists = current.delete(c);
      if (exists) continue;
      this._classes.add(c);
      this.element.classList.add(c);
    }

    for (let c of current) {
      this._classes.delete(c);
      this.element.classList.remove(c);
    }
  }

  add(classes: ElementClasses): string[] {
    const toAdd = processElementClasses(classes);
    const added: string[] = [];

    for (let c of toAdd) {
      const wasAdded = this._classes.add(c);
      if (!wasAdded) continue;
      this.element.classList.add(c);
      added.push(c);
    }

    return added;
  }

  remove(classes: ElementClasses): string[] {
    const toRemove = processElementClasses(classes);
    const removed: string[] = [];

    for (let c of toRemove) {
      const wasDeleted = this._classes.delete(c);
      if (!wasDeleted) continue;
      removed.push(c);
      this.element.classList.remove(c);
    }

    return removed;
  }
}
