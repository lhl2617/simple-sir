export type InputKey = `b` | `g` | `I_0` | `Steps`;
// {
//     b: number; // Infectivity parameter 
//     g: number; // Recovery rate
//     I_0: number; // Initial proportion affected
//     steps: number; // Steps to take
// }

export type SystemInput = Record<InputKey, number>;

export type SystemOutput = {
    S: number[];
    I: number[];
    converged: boolean;
}

// ts succcccc
export const StringToInputKey: Record<string, InputKey> = {
    b: `b`,
    g: `g`,
    I_0: `I_0`,
    Steps: `Steps`
};