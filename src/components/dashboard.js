import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import * as ActionCreators from '../store/action-creators';
import ConnectionState from './connection-state';
import Temperature from './temperature';
import Debug from './debug';

// export const Dashboard = React.createClass({
//     mixins: [PureRenderMixin],
//     render: function() {
//         let self = this;
//         return (
//             <div className="dashboard">
// //                 <Debug/>
// //                 <ConnectionState { ...self.props  } />
//                 {/*<div>*/}
//                     {/*<Temperature { ...self.props } />*/}
//                 {/*</div>*/}
//             </div>
//         );
//     }
// });

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
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
console.log(`DashboardContainer mapStateToProps: ${state}`);
    return {
        connectedToSensorHub: state.get('connectedToSensorHub'),
        temperature: state.get('temperature'),
        debug: state.get('debug')
    }
}

export const DashboardContainer = connect(
    mapStateToProps,
    ActionCreators
)(Dashboard);
