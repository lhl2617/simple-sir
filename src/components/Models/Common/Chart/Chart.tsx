import * as React from 'react';
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
            id: `chart`,
            type: 'line',
            fontFamily: 'CMUSS',
            // height: '100%'
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Model',
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
    series: {
        name: string;
        data: number[];
    }[];
    colors: string[];
    title: string;
}

interface IState {
}

class BaseChart extends React.Component<IProps, IState> {
    componentDidUpdate = (prevProps: IProps) => {
        if (this.props.series !== prevProps.series) {
            ApexCharts.exec(chartID, `updateSeries`, this.props.series);
        }
    };

    render() {
        const { colors, title } = this.props;
        chartProps.options.colors = colors;
        chartProps.options.title.text = title;
        return (
            <div className={styles.root}>
                <Chart {...chartProps} />
            </div>
        )
    }
}

export default BaseChart;
