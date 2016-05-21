import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Panel } from 'pui-react-panels';

import * as ActionCreators from '../store/action-creators';
import ConnectionState from './connection-state';
import Temperature from './temperature';
import Humidity from './humidity';
import ConnectionIndicator from './connection-indicator';
import TemperatureChart from './temperature-chart';
import HumidityChart from './humidity-chart';

import Debug from './debug';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let self = this;
        return (
            <Panel className="bg-neutral-10" header={ <ConnectionIndicator { ...self.props } /> }
                   actions={ <ConnectionState { ...self.props  } /> }>
                <Debug/>
                <div>
                    <Temperature { ...self.props } />
                    <Humidity { ...self.props } />
                </div>
                <div>
                    <TemperatureChart { ... self.props } />
                    <HumidityChart { ... self.props } />
                </div>
            </Panel>
        );
    }
}

export const DashboardContainer = connect(
    state => state.toJSON(),
    ActionCreators
)(Dashboard);
