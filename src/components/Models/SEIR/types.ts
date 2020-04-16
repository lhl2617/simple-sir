export type InputKey = `b` | `g` | `a` | `l` | `m` | `I_0` | `Steps`;

export type SystemInput = Record<InputKey, number>;

export type SystemOutput = {
    S: number[];
    E: number[];
    I: number[];
    R: number[];
    converged: boolean;
}

// ts succcccc
export const StringToInputKey: Record<string, InputKey> = {
    b: `b`,
    g: `g`,
    a: `a`,
    l: `l`,
    m: `m`,
    I_0: `I_0`,
    Steps: `Steps`
};