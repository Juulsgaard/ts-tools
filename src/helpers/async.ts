
/**
 * Create a promise that resolves in `time` ms
 * @category Async Tools
 * @param time
 */
export function sleep(time: number) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), time));
}
