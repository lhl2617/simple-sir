import * as React from 'react';
import { SystemOutput } from '../types';
import styles from './Chart.module.css';
import Chart from 'react-apexcharts';

const chartID = `chart`;

// @ts-ignore
const ApexCharts = window.ApexCharts;

const chartProps = {
    series: [],
    options: {
        colors: ['#0984e3', '#d63031', '#636e72'],
        chart: {
            // stacked: true,
            id: chartID,
            type: 'line',
            fontFamily: 'CMUSS',
            // height: '100%'
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'SIR Model',
            // align: 'left'
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
    componentDidUpdate = (prevProps: IProps) => {
        if (this.props !== prevProps) {
            const { S, I, R } = this.props.output;

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
            ];

            ApexCharts.exec(chartID, `updateSeries`, series);
        }
    };

    render() {
        return (
            <div className={styles.root}>
                <Chart {...chartProps}/>
            </div>
        )
    }
}

export default SIRChart;
