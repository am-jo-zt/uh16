import { List, Map, fromJS } from 'immutable';

export default function reduce(state = createInitialState(), action) {
    switch(action.type) {
        case 'SET_TEMPERATURE':
            return setState(setTemperature(state, action));
        case 'SET_HUMIDITY':
            return setState(setHumidity(state, action));
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
        humidity: null,
        connectedToSensorHub: false,

        history: {
            temperature: [],
            humidity: []
        }
    });
}

function setState(state, newState) { return state.merge(newState); }
function connectToSensorHub(state) { return state.set('connectedToSensorHub', true); }
function disconnectFromSensorHub(state) { return state.set('connectedToSensorHub', false); }
function setTemperature(state, action) {
    let newState = state.set('temperature', action.value);
    return setHistoricalValue(newState, 'temperature', action);
}
function setHumidity(state, action) {
    let newState = state.set('humidity', action.value);
    return setHistoricalValue(newState, 'humidity', action);
}
function setHistoricalValue(state, type, action) {
    let history = state.getIn(['history', type]);
    return state.setIn(['history', type], history.push(action));
}
