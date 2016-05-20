import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Panel } from 'pui-react-panels';

import * as ActionCreators from '../store/action-creators';
import ConnectionState from './connection-state';
import Temperature from './temperature';
import Humidity from './humidity';

import Debug from './debug';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let self = this;
        return (
            <Panel className="bg-neutral-10" header={ self.props.connectedToSensorHub
                ? 'connected'
                : 'disconnected' }>
                <Debug/>
                <ConnectionState { ...self.props  } />
                <div>
                    <Temperature { ...self.props } />
                    <Humidity { ...self.props } />
                </div>
            </Panel>
        );
    }
}

export const DashboardContainer = connect(
    state => state.toJSON(),
    ActionCreators
)(Dashboard);
