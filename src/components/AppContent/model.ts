// @ts-ignore
import * as Integrator from 'ode-rk4'; // no types :(
import { RK4FuncType, SystemInput, SystemOutput } from './types';

// const fst = (([a, b, c]: any[]) => a);
// const snd = (([a, b, c]: any[]) => b);
// const thd = (([a, b, c]: any[]) => c);

export class SIRModel {
    private sir: RK4FuncType = (dydt: number[], y: number[], t: number[]) => {
        dydt[0] = -this.b * y[0] * y[1];                  // S
        dydt[1] = this.b * y[0] * y[1] - this.g * y[1];   // I
        dydt[2] = this.g * y[1];                          // R
    };

    public simulate = (
        input: SystemInput,
        f: RK4FuncType = this.sir,
    ): SystemOutput => {
        const { b, g, I_0, N } = input;
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

        if (N !== 1) {
            ys = ys.map((y: number[]) => y.map((v) => v * N));
        } 

        // return {
        //     S: ys.map(fst),
        //     I: ys.map(snd),
        //     R: ys.map(thd)
        // }

        
        // transposing has better performance
        ys = ys.map((col, i) => ys.map(row => row[i]));
        return {
            S: ys[0],
            I: ys[1],
            R: ys[2],
            converged: this.checkConvergence(ys[0])
        }
    };

    /**
     * Check if the final two values differ at 4dp
     */
    private checkConvergence = (arr: number[]) => {
    
        // edge case
        if (arr.length < 2) return false;
    
        const last = Math.round(arr[arr.length - 1] * 10000);
        const slast = Math.round(arr[arr.length - 2] * 10000);
    
        console.log(last);
        console.log(slast);
        return (last !== undefined) && (last === slast);
    }

    private b: number = 0.1;
    private g: number = 0.05;
}
