var Integrator = function Integrator(y0, deriv, t, dt) {
    // Bind variables to this:
    this.deriv = deriv
    this.y = y0
    this.n = this.y.length
    this.dt = dt
    this.t = t

    // Create a scratch array into which we compute the derivative:
    this._ctor = this.y.constructor

    this._w = new this._ctor(this.n)
    this._k1 = new this._ctor(this.n)
    this._k2 = new this._ctor(this.n)
    this._k3 = new this._ctor(this.n)
    this._k4 = new this._ctor(this.n)
}

Integrator.prototype.step = function () {

    this.deriv(this._k1, this.y, this.t)

    for (var i = 0; i < this.n; i++) {
        this._w[i] = this.y[i] + this._k1[i] * this.dt * 0.5
    }

    this.deriv(this._k2, this._w, this.t + this.dt * 0.5)

    for (var i = 0; i < this.n; i++) {
        this._w[i] = this.y[i] + this._k2[i] * this.dt * 0.5
    }

    this.deriv(this._k3, this._w, this.t + this.dt * 0.5)

    for (var i = 0; i < this.n; i++) {
        this._w[i] = this.y[i] + this._k3[i] * this.dt
    }

    this.deriv(this._k4, this._w, this.t + this.dt)


    var dto6 = this.dt / 6.0
    for (var i = 0; i < this.n; i++) {
        this.y[i] += dto6 * (this._k1[i] + 2 * this._k2[i] + 2 * this._k3[i] + this._k4[i])
    }

    this.t += this.dt
    return this
}

Integrator.prototype.steps = function (n) {
    for (var step = 0; step < n; step++) {
        this.step()
    }
    return this
}

function IntegratorFactory(y0, deriv, t, dt) {
    return new Integrator(y0, deriv, t, dt)
}

/*
    Please first copy & paste the contents, starting from line 5, from
    https://github.com/scijs/ode-rk4/blob/master/lib/index.js
*/

/**
 * Actual simulation function used to run the system through a number of steps
 * 
 * @param {function(number[], number[], number[]) => void} f A function that calculates the derivative (ode-rk4)
 * @param {number} y_0 Initial state for system 
 * @param {number} steps Number of steps to execute
 */
const simulate = (f, y_0, steps) => {
     // ode system solver
    const rk4 = new Integrator(y_0, f, 0, 1);

     // make an array to contain all system values, add in initial state
    const ys = [y_0.slice()];

    while (--steps) { 
        rk4.step(); // take one step in system
        ys.push(rk4.y.slice()); // add results into ys
    }

    return ys;
};

/**
 * A function that calculates the derivative.
 * Format is function( dydt, y, t ).
 * This follows the format required by the `ode-rk4` package
 * 
 * @param {number[]} dydt (output) calculated derivative
 * @param {number[]} y (input) current state
 * @param {number[]} t (input) current time t (unused here)
 */
const sir = (dydt, y, t) => {
    dydt[0] = -b * y[0] * y[1];             // S
    dydt[1] = b * y[0] * y[1] - g * y[1];   // I
    dydt[2] = g * y[1];                     // R
};

// { -- CHANGE PARAMETERS HERE 
const b     = 0.1;      // Infectivity parameter 
const g     = 0.05;     // Recovery rate
const I_0   = 0.01;     // Initial proportion affected
const steps = 150;      // Steps to take
//  -- }

const y_0 = [1.0 - I_0, I_0, 0.0]; // initial state
const results = simulate(sir, y_0, steps); // run the results

console.log(results.join("\n")); // output results