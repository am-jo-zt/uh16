import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class ConnectionIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let self = this;
        return (
            <h4 style={
                self.props.connectedToSensorHub
                    ? { color: '#02ad00'}
                    : { color: '#dd0000'}
            }>{
                self.props.connectedToSensorHub
                    ? 'connected'
                    : 'disconnected'
            }</h4>
        )
    }
}
