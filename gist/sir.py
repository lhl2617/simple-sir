#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
Special thanks to @KY-Ng for visualisation code!
'''

import numpy as np # pip3 install numpy
from scipy.integrate import ode, solve_ivp # pip3 install scipy
import pandas as pd # pip3 install pandas
import matplotlib.pyplot as plt # pip3 install matplotlib


# { -- CHANGE PARAMETERS HERE
b       = 0.1
g       = 0.05
I_0     = 0.01
steps   = 150
#  -- }


def sir(times, y_0, b, g):
    S, I, R = y_0
    dS = -b * S * I         # S
    dI = b * S * I - g * I  # I 
    dR = g * I              # R
    return [dS, dI, dR]

y_0 = [1.0 - I_0, I_0, 0.0]
results = \
    solve_ivp( \
        fun     = lambda t, y: sir(t, y, b, g), \
        t_span  = [0, steps], \
        y0      = y_0, \
        t_eval  = range(steps + 1) \
    )

zipped_list = list(zip(results.y[0], results.y[1], results.y[2]))
for l in zipped_list: print(l)

df = pd.DataFrame({"S": results.y[0], "I": results.y[1], "R": results.y[2]})

# CHANGE SIZE OF GRAPH HERE
figureSize = (5, 5) # (width, height)

# Show the results of simulation
fig, ax = plt.subplots()
ax.set_title('Simulation of SIR Model')
ax.set_xlabel('Time')
ax.set_ylabel('Fractions of Whole Population')
df.plot.line( \
    ax      = ax, \
    grid    = True, \
    xlim    = (0, steps+1), \
    ylim    = (0, 1), \
    figsize = figureSize \
)
plt.show()