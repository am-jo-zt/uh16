import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Humidity extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let self = this;
        return (
            <div>Current humidity: { self.props.humidity }</div>
        );
    }
}
