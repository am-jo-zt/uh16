export function connectToSensorHub() {
    return { type: 'CONNECT_TO_SENSOR_HUB' };

}
export function disconnectFromSensorHub() {
    return { type: 'DISCONNECT_FROM_SENSOR_HUB' };
}

export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function setTemperature(value) {
    return {
        type: 'SET_TEMPERATURE',
        value
    };
}

export function setHumidity(value) {
    return {
        type: 'SET_HUMIDITY',
        value
    }
}

export function setLuminosity(value) {
    return {
        type: 'SET_LUMINOSITY',
        value
    }
}
