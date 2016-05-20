import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import Router, { Route } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import Urls from './constants/urls';
import App from './App';
import DashboardContainer from './components/dashboard-container';
import reducer from './store/reducer';
import remoteActionMiddleware from './remote-action-middleware';
import * as Action from './store/action-creators';

const socket = io(Urls.sensorHub);

socket.on('connect', __onConnect);
socket.on('state', __onState);
socket.on('event', __onEvent);
socket.on('disconnect', __onDisconnect);

const store  = createStoreWithMiddleware(reducer),
      routes =
          <Route component={App}>
              <Route path="/" component={ DashboardContainer } />
          </Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router>{routes}</Router>
    </Provider>,
    document.querySelector('#app')
);

function createStoreWithMiddleware(reducer) {
    return createStore(reducer, compose(
//         applyMiddleware(remoteActionMiddleware(socket)),
        applyMiddleware(remoteActionMiddleware()),
        window.devToolsExtension ?
            window.devToolsExtension() :
            f => f
    ));
}

function __onConnect() {
console.log('connected to sensor hub');
    store.dispatch(Action.connectToSensorHub());
}

function __onState() {
console.log('received state');
}

function __onDisconnect() {
console.log('disconnected from sensor hub');
    store.dispatch(Action.disconnectFromSensorHub());
}

function __onEvent(frame) {
console.log(arguments);
    if (frame == null) { return; }
    let data = JSON.parse(frame);
    store.dispatch(Action.setTemperature(data.value));
}
