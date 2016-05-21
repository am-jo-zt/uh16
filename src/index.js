import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import Urls from './constants/urls';
import { DashboardContainer } from './components/dashboard';
import reducer from './store/reducer';
import Client from './client/client';
import connectStoreToClient from './connectors/sensor-hub-connector';

let _client,
    _store;

_init();
_render();

// IMPLEMENTATION DETAILS

function _init() {
    _client = new Client(Urls.sensorHub);
    _store  = _createStoreWithMiddleware(reducer);
    connectStoreToClient(_store, _client);
    _client.connect();
}

function _render() {
    require('./style/main.css');
    require('./assets/pui/components.css');

    ReactDOM.render(
        <Provider store={_store}>
            <DashboardContainer client={_client} />
        </Provider>,
        document.querySelector('#app')
    );
}

function _createStoreWithMiddleware(reducer) {
    return createStore(reducer, compose(
        window.devToolsExtension ?
            window.devToolsExtension() :
            f => f
    ));
}
