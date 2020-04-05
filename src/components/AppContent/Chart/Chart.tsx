import * as React from 'react';
import Chart from 'react-apexcharts';
import { SystemOutput } from '../types';

import styles from './Chart.module.css';

const chartProps = {
    options: {
        chart: {
            type: 'line',
            fontFamily: 'CMUSS'
            // height: '100%'
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'SIR Model',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        yaxis: {
            type: 'numeric',
            decimalsInFloat: 3,
            min: 0.0,
            max: 1.0
        },
        xaxis: {
            type: 'numeric',
        }
    },
}

interface IProps {
    output: SystemOutput
}

interface IState {
}

class SIRChart extends React.Component<IProps, IState> {
    render() {
        const { output } = this.props;
        const { S, I, R } = output;
        const series = [
            {
                name: `S`,
                data: S,
            },
            {
                name: `I`,
                data: I,
            },
            {
                name: `R`,
                data: R
            }
        ]
        return (
            <div className={styles.root}>
                <Chart type="line" {...chartProps} series={series} />
            </div>
        )
    }
}

export default SIRChart;
