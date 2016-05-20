import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let self = this;
        return (
            <div>Current temperature: { self.props.temperature != null ? self.props.temperature.toFixed(2) : '-' }</div>
        );
    }
}
