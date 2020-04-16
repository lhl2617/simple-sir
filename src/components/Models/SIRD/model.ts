// @ts-ignore
import * as Integrator from 'ode-rk4'; // no types :(
import { SystemInput, SystemOutput } from './types';
import { checkConvergence, RK4FuncType } from '../Common/util';

export class SIRDModel {
    private SIRD: RK4FuncType = (dydt: number[], y: number[], t: number[]) => {
        const S = y[0];
        const I = y[1];
        // const R = y[2];
        dydt[0] = -this.b * S * I;                              // S
        dydt[1] = this.b * S * I - this.g * I - this.m * I;     // I
        dydt[2] = this.g * I;                                   // R
        dydt[3] = this.m * I;                                   // D
    };

    public simulate = (
        input: SystemInput,
        f: RK4FuncType = this.SIRD,
    ): SystemOutput => {
        const { b, g, m, I_0 } = input;
        let { Steps } = input;
        this.b = b;
        this.g = g;
        this.m = m;
        const y_0 = [1.0 - input.I_0, I_0, 0.0, 0.0];


        // ode system solver
        let rk4 = Integrator(y_0, f, 0, 1);

        // make an array to contain all system values, add in initial state
        let ys = [y_0.slice()];

        while (--Steps) {
            rk4.step(); // take one step in system
            ys.push(rk4.y.slice()); // add results into ys
        }

        ys = ys.map((col, i) => ys.map(row => row[i]));
        return {
            S: ys[0],
            I: ys[1],
            R: ys[2],
            D: ys[3],
            converged: checkConvergence(ys[0])
        }
    };

    private b: number = 0.1;
    private g: number = 0.05;
    private m: number = 0.025;
}
