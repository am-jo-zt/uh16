import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ConnectionState from './connection-state';
import Temperature from './temperature';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div class="dashboard">
                <ConnectionState { ...this.props  } />
                <div>
                    <Temperature { ...this.props } />
                </div>
            </div>
        );
    }
}
