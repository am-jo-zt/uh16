export default {
    connectToSensorHub,
    disconnectFromSensorHub,
    setState,
    setTemperature,
    setHumidity,
    setIlluminance
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
        state: event.value
    };
}

function setTemperature(data) {
    return {
        type: 'SET_TEMPERATURE',
        dataType: 'temperature',
        value: data.value,
        timestamp: data.timestamp
    };
}

function setHumidity(data) {
    return {
        type: 'SET_HUMIDITY',
        dataType: 'humidity',
        value: data.value,
        timestamp: data.timestamp
    }
}

function setIlluminance(data) {
    return {
        type: 'SET_ILLUMINANCE',
        dataType: 'illuminance',
        value: data.value,
        timestamp: data.timestamp
    }
}
