import * as React from 'react';
import styles from '../Common/styles.module.css';
import { SIRDModel } from './model';
import { Slider, InputNumber, Row, Col } from 'antd';
import { SystemInput, InputKey, StringToInputKey, SystemOutput } from './types';
import { BaseChart } from '../Common/Chart';
import { Summary } from './Summary';
import { onError, LabelInfo } from '../Common/util';

interface IProps {
}

interface IState {
    model: SIRDModel,
    input: SystemInput;
    output: SystemOutput
}

const labels: Record<InputKey, LabelInfo> = {
    b: { symbol: `\u03B2`, info: `Infectivity rate`, step: 0.001, min: 0, max: 1 },
    g: { symbol: `\u03B3`, info: `Recovery rate`, step: 0.001, min: 0, max: 1 },
    m: { symbol: `\u03BC`, info: `Mortality rate`, step: 0.001, min: 0, max: 1 },
    I_0: { symbol: `I\u2080`, info: `Initial proportion infected`, step: 0.001, min: 0, max: 1.0 },
    Steps: { symbol: `S`, info: `Simulation steps`, step: 1, min: 5, max: 1000 }
}

const initialState: SystemInput = {
    b: 0.1,
    g: 0.05,
    m: 0.025,
    I_0: 0.01,
    Steps: 150
}

class SIRD extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            model: new SIRDModel(),
            input: initialState,
            output: { S: [], I: [], R: [], D:[], converged: false }
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

    onChange = (inputKey: InputKey) => async (value: any) => {
        let { input } = this.state;

        if (typeof value !== `number`) {
            onError(`Invalid value!`);
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

    getSeries = () => {
        const { output } = this.state;
        const { S, I, R, D } = output;
        return [
            {
                name: `S`,
                data: S
            },
            {
                name: `I`,
                data: I
            },
            {
                name: `R`,
                data: R
            },
            {
                name: `D`, 
                data: D
            }
        ];
    }

    render = () => {
        const { output, input } = this.state;
        return (
            <div className={styles.root}>
                <h1>SIRD Model</h1>
                <Row gutter={32} style={{ margin: 32 }} justify="space-around">
                    {(this.getColsForRow([`b`, `g`, `m`]))}
                </Row>
                <Row gutter={32} style={{ margin: 32 }} justify="space-around">
                    {(this.getColsForRow([`I_0`, `Steps`]))}
                </Row>

                <BaseChart colors={['#0984e3', '#d63031', '#1abc9c', '#000000']} series={this.getSeries()} title={`SIRD Model`}/>

                <Summary input={input} output={output} />
            </div>
        );
    }
};

export default SIRD;