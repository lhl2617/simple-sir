
/**
 * Check if the final two values differ at 4dp
 */
export const checkConvergence = (arr: number[]) => {

    // edge case
    if (arr.length <= 2) return false;

    const last = Math.round(arr[arr.length - 1] * 10000);
    const slast = Math.round(arr[arr.length - 2] * 10000);

    return (last !== undefined) && (last === slast);
}
