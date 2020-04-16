import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { modelComponentMap } from '../../utils/defs';



export class AppContent extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/"
                    exact
                >
                    <Redirect to="/sir" />
                </Route>
                {Object.entries(modelComponentMap).map(([id, comp]) => 
                <Route
                    path={`/${id.toLocaleLowerCase()}`}
                    exact
                    component={comp}
                    key={id}
                />)}
                <Redirect to="/sir" />
            </Switch>
        );
    }
}


export default AppContent;