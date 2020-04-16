import * as React from 'react';
import styles from './SIR.module.css';
import { SIRModel } from './model';
import { Slider, InputNumber, Row, Col, message } from 'antd';
import { LabelInfo, SystemInput, InputKey, StringToInputKey, SystemOutput } from './types';
import { SIRChart } from '../Common/Chart';
import { Summary } from './Summary';

interface IProps {
}

interface IState {
    model: SIRModel,
    input: SystemInput;
    output: SystemOutput
}

const labels: Record<InputKey, LabelInfo> = {
    b: { symbol: `\u03B2`, info: `Infectivity rate`, step: 0.001, min: 0, max: 1 },
    g: { symbol: `\u03B3`, info: `Recovery rate`, step: 0.001, min: 0, max: 1 },
    I_0: { symbol: `I\u2080`, info: `Initial proportion infected`, step: 0.001, min: 0, max: 1.0 },
    Steps: { symbol: `S`, info: `Simulation steps`, step: 1, min: 5, max: 1000 }
}

const initialState: SystemInput = {
    b: 0.1,
    g: 0.05,
    I_0: 0.01,
    Steps: 150
}

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

class SIR extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            model: new SIRModel(),
            input: initialState,
            output: { S: [], I: [], R: [], converged: false }
        }
    }

    update = async () => {
        const { input, model } = this.state;
        // console.log(input);
        const output = model.simulate(input);
        // console.log(output);
        this.setState({
            ...this.state,
            output: output
        });
    }

    componentDidMount = () => {
        this.update();
    };

    onError = async (msg: string) => {
        message.error(msg);
    }

    onChange = (inputKey: InputKey) => async (value: any) => {
        let { input } = this.state;

        if (typeof value !== `number`) {
            this.onError(`Invalid value!`);
            return;
        }

        input[inputKey] = value;

        this.setState({
            // ...this.state,
            input: input
        })
    }

    getColsForRow = (colKeys: string[]) => {
        return colKeys
            .map((k: string) => StringToInputKey[k])
            // .filter((x) => x)
            .map((k: InputKey, idx: number) => {
                const lInfo = labels[k];
                const v = this.state.input[k];
                const props = {
                    min: lInfo.min,
                    max: lInfo.max,
                    step: lInfo.step,
                    value: typeof v === 'number' ? v : initialState[k]
                }
                return (<Col xs={24} md={6} key={idx} className={styles.sliderCol}>
                    <h3>{lInfo.symbol} ({lInfo.info})</h3>
                    <Slider {...props} onChange={this.onChange(k)} onAfterChange={this.update} />
                    <InputNumber {...props} onChange={(value) => { this.onChange(k)(value); this.update(); }} />
                </Col>);
            });
    }

    render = () => {
        const { output, input } = this.state;
        return (
            <div className={styles.root}>
                <h1>SIR Model</h1>
                <h2>
                    (
                        <a rel="noopener noreferrer" target="_blank" href="https://mathworld.wolfram.com/Kermack-McKendrickModel.html">Kermack-McKendrick Model</a>;
                        <a rel="noopener noreferrer" target="_blank" href="https://lpsa.swarthmore.edu/NumInt/NumIntFourth.html"> RK4</a>
                    )
                </h2>
                <Row gutter={32} style={{ margin: 32 }} justify="space-around">
                    {(this.getColsForRow([`b`, `g`, `I_0`, `Steps`]))}
                </Row>
                {/* Currently don't allow population - unnecessary processing */}
                {/* <Row gutter={32} style={{ margin: 24 }} justify="space-around">
                    {(this.getColsForRow([`N`]))}
                </Row> */}

                <SIRChart output={output} />

                <Summary input={input} output={output} />
            </div>
        );
    }
};

export default SIR;