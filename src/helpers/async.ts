
/**
 * Create a prmise that resolves in `time` ms
 * @param time
 */
export function sleep(time: number) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), time));
}
