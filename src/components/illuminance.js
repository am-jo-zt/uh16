import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Illuminance extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let self = this;
        return (
            <div>Current illuminance: { self.props.illuminance != null ? self.props.illuminance.toFixed(2) : '-' }</div>
        );
    }
}
