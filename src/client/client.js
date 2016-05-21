import io from 'socket.io-client';

export default class Client {
    constructor(url) {
        this._url = url;
    }

    setConnectHandler(handleConnect) { this.__handleConnect = handleConnect; }
    setDisconnectHandler(handleDisconnect) { this.__handleDisconnect = handleDisconnect; }
    setTemperatureHandler(handleTemperature) { this.__handleTemperature = handleTemperature; }
    setHumidityHandler(handleHumidity) { this.__handleHumidity = handleHumidity; }

    connect() {
        let socket = this._socket = io(this._url);
        socket.on('connect', this.__handleConnect);
        socket.on('temperature', this.__handleTemperature);
        socket.on('humidity', this.__handleHumidity);
        socket.on('disconnect', this.__handleDisconnect);
    }
    disconnect() { this._socket.disconnect(); }
}
