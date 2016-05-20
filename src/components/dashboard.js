import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

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
            <div class="dashboard">
                <Debug/>
                <ConnectionState { ...self.props  } />
                <div>
                    <Temperature { ...self.props } />
                    <Humidity { ...self.props } />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
console.log(`DashboardContainer mapStateToProps: ${state}`);
    return state.toJSON();
}

export const DashboardContainer = connect(
    mapStateToProps,
    ActionCreators
)(Dashboard);
