export type RK4FuncType = (dydt: number[], y: number[], t: number[]) => void;

export type InputKey = `b` | `g` | `I_0` | `Steps`;
// {
//     b: number; // Infectivity parameter 
//     g: number; // Recovery rate
//     I_0: number; // Initial proportion affected
//     steps: number; // Steps to take
//     N: number // Popln size
// }

export type SystemInput = Record<InputKey, number>;

export type SystemOutput = {
    S: number[];
    I: number[];
    R: number[];
    converged: boolean;
}

export type LabelInfo = {
    symbol: string;
    info: string;
    step: number;
    min: number;
    max: number;
}

// ts succcccc
export const StringToInputKey: Record<string, InputKey> = {
    b: `b`,
    g: `g`,
    I_0: `I_0`,
    Steps: `Steps`
};