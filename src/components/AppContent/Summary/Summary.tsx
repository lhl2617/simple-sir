import * as React from 'react';
import { Col, Row } from 'antd';
import { SystemOutput, SystemInput } from '../types';

import styles from './Summary.module.css';

interface IProps {
    input: SystemInput,
    output: SystemOutput
}

interface IState {
}

class Summary extends React.Component<IProps, IState> {
    render = () => {
        const { input, output } = this.props;
        const { b, g, I_0, Steps } = input;
        const { S, I, R, converged } = output;
        return (
            <div>
                <div className={styles.summary}>
                    <h2>Summary</h2>
                    <Row justify="center" gutter={32}>
                        <Col xs={24} md={5} >
                            <h3>Parameters</h3>
                            <div>{`\u03B2`} = {b.toFixed(3)}</div>
                            <div>{`\u03B3`} = {g.toFixed(3)}</div>
                            <div>{`I\u2080`} = {I_0.toFixed(3)}</div>
                            <div>Steps = {Steps}</div>
                        </Col>
                        <Col xs={24} md={5} >
                            <h3>Final Values</h3>
                            <div>Converged: {converged ? `Yes` : `No`}</div>
                            <div>S = {S && S.length ? S[S.length - 1].toFixed(3) : `0`}</div>
                            <div>I = {I && I.length ? I[I.length - 1].toFixed(3) : `0`}</div>
                            <div>R = {R && R.length ? R[R.length - 1].toFixed(3) : `0`}</div>
                        </Col>
                        <Col xs={24} md={5} >
                            <h3>Other Information</h3>
                            <div>{`R\u2080`} (Basic reproduction number) = {g > 0 ? (b / g).toFixed(3) : 0}</div>
                        </Col>
                    </Row>
                </div>

                <div className={styles.summary}>
                    <h2>Resources</h2>
                    <div>
                        <a rel="noopener noreferrer" target="_blank" href="https://github.com/lhl2617/simple-sir">Source code (Github)</a>
                    </div>
                    <div>
                        <a rel="noopener noreferrer" target="_blank" href="https://mathworld.wolfram.com/Kermack-McKendrickModel.html">Wolfram MathWorld</a>
                    </div>
                    <div>
                        <a rel="noopener noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model">Wikipedia</a>
                    </div>
                </div>
            </div>

        );
    };
}

export default Summary;