export default {
    connectToSensorHub,
    disconnectFromSensorHub,
    setState,
    setTemperature,
    setHumidity,
    setLuminosity
};


function connectToSensorHub() {
    return { type: 'CONNECT_TO_SENSOR_HUB' };

}
function disconnectFromSensorHub() {
    return { type: 'DISCONNECT_FROM_SENSOR_HUB' };
}

function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

function setTemperature(value) {
    return {
        type: 'SET_TEMPERATURE',
        value
    };
}

function setHumidity(value) {
    return {
        type: 'SET_HUMIDITY',
        value
    }
}

function setLuminosity(value) {
    return {
        type: 'SET_LUMINOSITY',
        value
    }
}
