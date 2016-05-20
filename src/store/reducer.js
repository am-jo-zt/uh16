import { List, Map, fromJS } from 'immutable';

export default function reduce(state = createInitialState(), action) {
    switch(action.type) {
        case 'SET_TEMPERATURE':
            return setState(setTemperature(state, action));
        case 'CONNECT_TO_SENSOR_HUB':
            return setState(connectToSensorHub(state));
        case 'DISCONNECT_FROM_SENSOR_HUB':
            return setState(disconnectFromSensorHub(state));
    }
    return state;
}

function createInitialState() {
    return fromJS({
        debug: true,
        temperature: null,
        connectedToSensorHub: false
    });
}

function setState(state, newState) { return state.merge(newState); }
function setTemperature(state, action) { return state.set('temperature', action.value); }
function connectToSensorHub(state) { return state.set('connectedToSensorHub', true); }
function disconnectFromSensorHub(state) { return state.set('connectedToSensorHub', false); }
