/**
 * Set the first character in the string to lowercase
 * @param str
 */
export function lowerFirst<T extends string>(str: T): Uncapitalize<T> {
  if (!str) return str as Uncapitalize<T>;
  return str[0]!.toLowerCase() + str.substring(1) as Uncapitalize<T>;
}

/**
 * Set the first character in the string to uppercase
 * @param str
 */
export function upperFirst<T extends string>(str: T): Capitalize<T> {
  if (!str) return str as Capitalize<T>;
  return str[0]!.toUpperCase() + str.substring(1) as Capitalize<T>;
}

/**
 * Format the string as Title Case
 * @param str
 */
export function titleCase(str: string) {
  if (!str) return str;

  return upperFirst(
    str.trim()
      .replace(/[-\s]+(\w)/g, (_, c) => ` ${c.toUpperCase()}`)
      .replace(/(\w)([A-Z])/g, (_, a, b) => `${a} ${b}`)
  );
}

/**
 * Format the string as a URL safe slug
 * @param str
 */
export function slugify(str: string) {
  if (!str) return str;
  return str.toLowerCase().trim().replace(/\W+/g, '-');
}

/**
 * Format the string as PascalCase
 * @param str
 */
export function pascalCase(str: string) {
  if (!str) return str;

  return upperFirst(
    str.trim().replace(/[-\s]+(\w)/g, (_, c) => c.toUpperCase())
  );
}

/**
 * Format the string as camelCase
 * @param str
 */
export function camelCase(str: string) {
  if (!str) return str;

  return lowerFirst(
    str.trim().replace(/[-\s]+(\w)/g, (_, c) => c.toUpperCase())
  );
}

/**
 * Format the string as dash-case
 * @param str
 */
export function dashCase(str: string) {
  if (!str) return str;

  return lowerFirst(str.trim())
    .replace(/[A-Z]|[-\s]+\w/g, x => `-${x.toLowerCase()}`);
}

/**
 * Remove any HTML tags from the string
 * @param str
 */
export function stripTags(str: string) {
  if (!str) return str;
  let tmp = document.createElement("DIV");
  tmp.innerHTML = str;
  return tmp.textContent || tmp.innerText || "";
}

/**
 * Generate initials from a name
 * @param name
 */
export function getNameInitials(name: string) {
  if (!name.length) return 'XX';
  const segments = name.trim().split(/\s+/);

  if (segments.length > 1) {
    return segments[0]![0]!.toUpperCase() + segments[segments.length - 1]![0]!.toUpperCase();
  }

  if (segments[0]!.length < 2) {
    return segments[0]![0]!.toUpperCase();
  }

  return segments[0]![0]!.toUpperCase() + segments[0]![1]!.toLowerCase();
}
