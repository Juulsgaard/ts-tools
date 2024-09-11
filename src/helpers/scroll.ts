import {isNumber} from "./type-predicates";

interface ScrollOptions {
  offset?: number;
  container?: HTMLElement;
}

/**
 * Scroll to an element with an optional offset
 * @category Scroll Tools
 * @param element
 * @param offset
 */
export function scrollToElement(element: HTMLElement, offset: number): void;
/**
 * Scroll to an element with an optional offset
 * @category Scroll Tools
 * @param element
 * @param options
 */
export function scrollToElement(element: HTMLElement, options?: ScrollOptions): void;
export function scrollToElement(element: HTMLElement, options?: ScrollOptions|number): void{
  options = isNumber(options) ? {offset: options} : options;
  const offset = options?.offset ?? 0;

  if (options?.container == null || options.container == document.body) {

    const topPos = element.getBoundingClientRect().top;

    window.scrollTo({
      top: Math.max(0, (topPos + window.scrollY) - offset),
      behavior: "smooth"
    });

    return;
  }

  const containerTop = options.container.getBoundingClientRect().top;
  const top = element.getBoundingClientRect().top;
  const delta = top - containerTop;

  options.container.scrollTo({
    top: Math.max(0, (delta + options.container.scrollTop) - offset),
    behavior: "smooth"
  });
}
