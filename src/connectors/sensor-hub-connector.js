import Action from '../store/action-creators';

export default function SensorHubConnector(store, client) {
    client.setConnectHandler((data) => { handleConnect(store, data); });
    client.setDisconnectHandler((data) => { handleDisconnect(store, data); });
    client.setTemperatureHandler((data) => { handleTemperature(store, data); });
    client.setHumidityHandler((data) => { handleHumidity(store, data); });
}

function handleConnect(store, data) {
console.log('connected to sensor hub');
    store.dispatch(Action.connectToSensorHub());
}

function handleDisconnect(store, data) {
console.log('disconnected from sensor hub');
    store.dispatch(Action.disconnectFromSensorHub());
}

function handleTemperature(store, data) {
    if (data.value == null) { return; }
    store.dispatch(Action.setTemperature(data));
}
function handleHumidity(store, data) {
    if (data.value == null) { return; }
    store.dispatch(Action.setHumidity(data));
}
