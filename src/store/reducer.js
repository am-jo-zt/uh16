import { List, Map } from 'immutable';

export default function reduce(state = Map(), action) {
    switch(action.type) {
        case 'SET_TEMPERATURE':
            return setState(setTemperature(state, action));
        case 'CONNECT_TO_SENSOR_HUB':
            return setState(connectToSensorHub());
        case 'DISCONNECT_FROM_SENSOR_HUB':
            return setState(disconnectFromSensorHub());
    }
    return state;
}

function setState(state, newState) { return state.merge(newState); }
function setTemperature(state, action) { return state.set('temperature', action.value); }
function connectToSensorHub(state) { return state.set('connectedToSensorHub', true); }
function disconnectFromSensorHub(state) { return state.set('connectedToSensorHub', false); }
