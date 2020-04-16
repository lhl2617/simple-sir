import * as React from 'react';
import styles from './Chart.module.css';
import Chart from 'react-apexcharts';

const chartID = `chart`;

// @ts-ignore
const ApexCharts = window.ApexCharts;

interface IProps {
    series: object;
    chartProps: object;
}

interface IState {
}

class SIRChart extends React.Component<IProps, IState> {
    componentDidUpdate = (prevProps: IProps) => {
        if (this.props.series !== prevProps.series) {
            ApexCharts.exec(chartID, `updateSeries`, this.props.series);
        }
    };

    render() {
        const { chartProps } = this.props;
        return (
            <div className={styles.root}>
                <Chart {...chartProps}/>
            </div>
        )
    }
}

export default SIRChart;
