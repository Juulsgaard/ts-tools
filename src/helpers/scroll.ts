
/**
 * Scroll to an element with an optional offset
 * @param element
 * @param offset
 */
export function scrollToElement(element: HTMLElement, offset = 0){
  const topPos = element.getBoundingClientRect().top;

  window.scrollTo({
    top: Math.max(0, (topPos + window.scrollY) - offset),
    behavior: "smooth"
  });
}
