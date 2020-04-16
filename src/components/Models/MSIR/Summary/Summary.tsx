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
        const { b, g, m, l, d, I_0, Steps } = input;
        const { M, S, I, R, converged } = output;
        return (
            <div>
                <div className={styles.summary}>
                    <h2>Summary</h2>
                    <Row justify="center" gutter={32}>
                        <Col xs={24} md={5} >
                            <h3>Parameters</h3>
                            <div>{`\u03B2`} = {b.toFixed(3)}</div>
                            <div>{`\u03B3`} = {g.toFixed(3)}</div>
                            <div>{`\u03BC`} = {m.toFixed(3)}</div>
                            <div>{`\u039B`} = {l.toFixed(3)}</div>
                            <div>{`\u03B4`} = {d.toFixed(3)}</div>
                            <div>{`I\u2080`} = {I_0.toFixed(3)}</div>
                            <div>Steps = {Steps}</div>
                        </Col>
                        <Col xs={24} md={5} >
                            <h3>Final Values</h3>
                            <div>Converged: {converged ? `Yes` : `No`}</div>
                            <div>Maternally Immune, M = {(M && M.length) ? M[M.length - 1].toFixed(3) : `0`}</div>
                            <div>Susceptible, S =  {(S && S.length) ? S[S.length - 1].toFixed(3) : `0`}</div>
                            <div>Infected, I = {(I && I.length) ? I[I.length - 1].toFixed(3) : `0`}</div>
                            <div>Removed, R = {(R && R.length) ? R[R.length - 1].toFixed(3) : `0`}</div>
                        </Col>
                    </Row>
                </div>

                <div className={styles.summary}>
                    <h2>Resources</h2>
                    <div>
                        <a rel="noopener noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_MSIR_model">Wikipedia</a>
                    </div>
                </div>
            </div>

        );
    };
}

export default Summary;