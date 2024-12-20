import {isArray, isObject, isString} from "../helpers/type-predicates";

/**
 * Supported formats for a collection of CSS classes
 * @category HTML Tools
 */
export type ElementClasses = string[] | Record<string, boolean> | string | undefined | null;

/**
 * Unify different class collection formats into a list of strings
 * @category HTML Tools
 * @param classes - The class collection
 */
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

/**
 * A class to manage the applied classes on an HTML Element.
 * The class keeps track of what classes were added and can use that to create differentials.
 * @category HTML Tools
 */
export class ElementClassManager<T extends HTMLElement = HTMLElement> {
  private readonly _classes = new Set<string>();
  get classes(): ReadonlySet<string> {
    return this._classes
  };

  constructor(readonly element: T, initialClasses?: ElementClasses) {
    this._classes = new Set<string>(processElementClasses(initialClasses));
    this.element.classList.add(...this.classes);
  }

  private addClass(c: string) {
    const added = this._classes.add(c);
    if (!added) return false;
    this.element.classList.add(c);
    return true;
  }

  private removeClass(c: string) {
    const removed = this._classes.delete(c);
    if (!removed) return false;
    this.element.classList.remove(c);
    return true;
  }

  /**
   * Update the applied classes to the given state.
   * New classes will be applied, and classes not in the new state will be removed.
   * @param classes - The new classes state
   */
  set(classes: ElementClasses) {
    const current = new Set(this.classes);
    const toSet = processElementClasses(classes);

    for (let c of toSet) {
      const exists = current.delete(c);
      if (exists) continue;
      this.addClass(c)
    }

    for (let c of current) {
      this.removeClass(c);
    }
  }

  /**
   * Add classes to the HTML Element.
   * @param classes - The classes to add
   * @returns addedClasses - A list of classes that were added to the state
   */
  add(classes: ElementClasses): string[] {
    const toAdd = processElementClasses(classes);
    const added: string[] = [];

    for (let c of toAdd) {
      const wasAdded = this.addClass(c);
      if (!wasAdded) continue;
      added.push(c);
    }

    return added;
  }

  /**
   * Remove classes from the HTML Element.
   * @param classes - The classes to remove
   * @returns removedClasses - A list of classes that were removed from the state
   */
  remove(classes: ElementClasses): string[] {
    const toRemove = processElementClasses(classes);
    const removed: string[] = [];

    for (let c of toRemove) {
      const wasDeleted = this.remove(c);
      if (!wasDeleted) continue;
      removed.push(c);
    }

    return removed;
  }

  /**
   * Toggle classes from the HTML Element.
   * @param classes - The classes and their toggle state
   * @returns affectedClasses - lists of classes that were added / removed from the state
   */
  toggle(classes: Record<string, boolean>): {added: string[], removed: string[]};
  /**
   * Toggle classes from the HTML Element.
   * @param classes - The classes to remove
   * @param state - Force the state of classes
   * @returns affectedClasses - lists of classes that were added / removed from the state
   */
  toggle(classes: Exclude<ElementClasses, Record<string, boolean>>, state?: boolean): {added: string[], removed: string[]};
  toggle(classes: ElementClasses, state?: boolean): {added: string[], removed: string[]} {

    const added: string[] = [];
    const removed: string[] = [];

    if (isObject(classes) && !isArray(classes)) {

      for (let c in classes) {

        const cState = classes[c];

        if (cState) {
          const wasAdded = this.addClass(c);
          if (wasAdded) added.push(c);
        } else {
          const wasRemoved = this.removeClass(c);
          if (wasRemoved) removed.push(c);
        }

      }

      return {added, removed};
    }

    const classList = processElementClasses(classes);

    for (let c of classList) {
      if (state) {
        const wasAdded = this.addClass(c);
        if (wasAdded) added.push(c);
      } else {
        const wasRemoved = this.removeClass(c);
        if (wasRemoved) removed.push(c);
      }
    }

    return {added, removed};
  }
}
