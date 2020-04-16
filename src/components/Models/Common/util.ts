import { message } from "antd";


export type RK4FuncType = (dydt: number[], y: number[], t: number[]) => void;

export type LabelInfo = {
    symbol: string;
    info: string;
    step: number;
    min: number;
    max: number;
}


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

export const onError = async (msg: string) => {
    message.error(msg);
}