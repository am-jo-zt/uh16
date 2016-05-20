import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import Urls from './constants/urls';
import { DashboardContainer } from './components/dashboard';
import reducer from './store/reducer';
import * as Action from './store/action-creators';

const socket = io(Urls.sensorHub);
socket.on('connect', __onConnect);
socket.on('state', __onState);
socket.on('disconnect', __onDisconnect);

const store  = createStoreWithMiddleware(reducer);

require('./style/main.css');

ReactDOM.render(
    <Provider store={store}>
        <DashboardContainer />
    </Provider>,
    document.querySelector('#app')
);

function createStoreWithMiddleware(reducer) {
    return createStore(reducer, compose(
        window.devToolsExtension ?
            window.devToolsExtension() :
            f => f
    ));
}

function __onConnect() {
console.log('connected to sensor hub');
    store.dispatch(Action.connectToSensorHub());
}

function __onDisconnect() {
console.log('disconnected from sensor hub');
    store.dispatch(Action.disconnectFromSensorHub());
}

function __onState(data) {
    if (data == null) { return; }
    switch (data.type) {
        case 'TEMPERATURE':
            store.dispatch(Action.setTemperature(data.value));
            break;
        case 'HUMIDITY':
            store.dispatch(Action.setHumidity(data.value));
            break;
    }
}
