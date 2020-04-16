// @ts-ignore
import * as Integrator from 'ode-rk4'; // no types :(
import { SystemInput, SystemOutput } from './types';
import { checkConvergence, RK4FuncType } from '../Common/util';

export class SEIRModel {
    private SEIR: RK4FuncType = (dydt: number[], y: number[], t: number[]) => {
        const S = y[0];
        const E = y[1];
        const I = y[2];
        const R = y[3];
        dydt[0] = this.l - this.m * S - this.b * S * I;         // S
        dydt[1] = this.b * S * I - (this.m + this.a) * E;       // E
        dydt[2] = this.a * E - (this.g + this.m) * I;           // I
        dydt[3] = this.g * I - this.m - R;                      // R
    };

    public simulate = (
        input: SystemInput,
        f: RK4FuncType = this.SEIR,
    ): SystemOutput => {
        const { b, g, I_0 } = input;
        let { Steps } = input;
        this.b = b;
        this.g = g;
        const y_0 = [1.0 - input.I_0, I_0, 0.0];


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
            E: ys[1],
            I: ys[2],
            R: ys[3],
            converged: checkConvergence(ys[0])
        }
    };

    private b: number = 0.1;
    private g: number = 0.05;
    private a: number = 0.005;
    private m: number = 0.005;
    private l: number = 0.01;

}
