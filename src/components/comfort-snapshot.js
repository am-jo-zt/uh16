import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class ComfortSnapshot extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let self = this;
        return (
            <button onClick={ () => self.props.takeComfortSnapshot() }>Take comfort snapshot</button>
        );
    }
}
