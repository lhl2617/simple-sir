export type InputKey = `b` | `g` | `m` | `l` | `d` | `I_0` | `Steps`;

export type SystemInput = Record<InputKey, number>;

export type SystemOutput = {
    M: number[];
    S: number[];
    I: number[];
    R: number[];
    converged: boolean;
}

// ts succcccc
export const StringToInputKey: Record<string, InputKey> = {
    b: `b`,
    g: `g`,
    m: `m`,
    l: `l`,
    d: `d`,
    I_0: `I_0`,
    Steps: `Steps`
};