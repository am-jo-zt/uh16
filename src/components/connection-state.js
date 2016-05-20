import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class ConnectionState extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let self = this;
        return (
            <div><span>{
                self.props.connectedToSensorHub
                    ? 'connected'
                    : 'disconnected'
            }</span><button onClick={ () => {
                self.props.connectedToSensorHub
                    ? self.props.client.disconnect()
                    : self.props.client.connect() }
            }>{
                self.props.connectedToSensorHub
                    ? 'disconnect'
                    : 'connect'
            }</button></div>
        );
    }
}
