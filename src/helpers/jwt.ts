
/**
 * Parse a JWT token
 * @category JWT Tools
 * @param token
 */
export function parseJwt<TModel>(token: string): TModel {
    const base64Url = token.split('.')[1];
    if (!base64Url) throw Error("Invalid JWT token string");

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);
}
