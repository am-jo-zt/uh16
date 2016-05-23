import { List, Map, fromJS } from 'immutable';

const MAX_HISTORY_WINDOW_SIZE = 40;

export default function reduce(state = createInitialState(), action) {
    switch(action.type) {
        case 'SET_TEMPERATURE':
            return setState(setTemperature(state, action));
        case 'SET_HUMIDITY':
            return setState(setHumidity(state, action));
        case 'SET_ILLUMINANCE':
            return setState(setIlluminance(state, action));
        case 'CONNECT_TO_SENSOR_HUB':
            return setState(connectToSensorHub(state));
        case 'DISCONNECT_FROM_SENSOR_HUB':
            return setState(disconnectFromSensorHub(state));
        case 'COMFORT_SNAPSHOT':
            return setState(takeComfortSnapshot(state));
    }
    return state;
}

function createInitialState() {
    return fromJS({
        debug: true,
        temperature: null,
        humidity: null,
        illuminance: null,
        connectedToSensorHub: false,

        history: {
            temperature: [],
            humidity: [],
            illuminance: []
        },
        comfortZone: {
            temperature: null,
            humidity: null,
            illuminance: null
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
function setIlluminance(state, action) {
    let newState = state.set('illuminance', action.value);
    return setHistoricalValue(newState, 'illuminance', action);
}
function setHistoricalValue(state, type, action) {
    let history = state.getIn(['history', type]);
    return state.setIn(['history', type], _getHistoryWindow(history.push(action)));
}
function takeComfortSnapshot(state) {
    let snapshot = state.setIn(['comfortZone', 'temperature'], state.get('temperature'))
        .setIn(['comfortZone', 'humidity'], state.get('humidity'))
        .setIn(['comfortZone', 'illuminance'], state.get('illuminance'));
    return snapshot;
}


function _getHistoryWindow(history) {
    return history.slice(Math.max(history.size - MAX_HISTORY_WINDOW_SIZE, 0), history.size);
}
