/**
 * Open a URL using an anchor tag
 * @param url
 * @param newTab
 */
import {isString} from "./type-predicates";

export function openUrl(url: string, newTab = false) {
  const anchor = document.createElement('a');
  anchor.href = url;

  if (newTab) anchor.target = '_blank';

  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}

/**
 * Trim a URL path, so it has no starting or trailing slash
 * @param path
 */
export function trimUrlPath(path: string) {
  return path.trim().replace(/(^\/+|\/+$)/, '').toLowerCase();
}

/**
 * Add a query param to a URL
 * @param url
 * @param prop
 * @param value
 */
export function applyQueryParam(url: string, prop: string, value: string) {
  if (!url) return url;
  return url.includes('?')
    ? `${url}&${prop}=${value}`
    : `${url}?${prop}=${value}`;
}

/**
 * Download from URL / DataURL
 * @param url - URL or DataURL
 * @param filename - Name of downloaded file
 */
export function downloadUrl(url: string, filename?: string) {
  const a = document.createElement('a');

  a.href = url;
  a.target = '_blank';
  a.style.display = 'none';

  if (filename) {
    a.download = filename;
  }

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    a.remove();
  }, 500);
}

/**
 * Generate and download a JSON file based provided JSON string or Object
 * @param json - JSON string or JS Object
 * @param filename - Filename of downloaded file
 */
export function downloadJson(json: any, filename: string) {

  const a = document.createElement('a');
  const file = new Blob([isString(json) ? json : JSON.stringify(json)], {type: 'application/json'});

  a.href = URL.createObjectURL(file);
  a.style.display = 'none';
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    a.remove();
  }, 500);
}
