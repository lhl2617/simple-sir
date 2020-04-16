export type InputKey = `b` | `g` | `m` | `I_0` | `Steps`;

export type SystemInput = Record<InputKey, number>;

export type SystemOutput = {
    S: number[];
    I: number[];
    R: number[];
    D: number[];
    converged: boolean;
}

// ts succcccc
export const StringToInputKey: Record<string, InputKey> = {
    b: `b`,
    g: `g`,
    m: `m`,
    I_0: `I_0`,
    Steps: `Steps`
};