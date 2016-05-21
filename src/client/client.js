import io from 'socket.io-client';

export default class Client {
    constructor(url) {
        this._url = url;
    }

    setConnectHandler(handleConnect) { this.__handleConnect = handleConnect; }
    setDisconnectHandler(handleDisconnect) { this.__handleDisconnect = handleDisconnect; }
    setTemperatureHandler(handleTemperature) { this.__handleTemperature = handleTemperature; }
    setHumidityHandler(handleHumidity) { this.__handleHumidity = handleHumidity; }
    setIlluminanceHandler(handleIlluminance) { this.__handleIlluminance = handleIlluminance; }

    connect() {
        let socket = this._socket = io(this._url);
        socket.on('connect', this.__handleConnect);
        socket.on('disconnect', this.__handleDisconnect);
        socket.on('temperature', this.__handleTemperature);
        socket.on('humidity', this.__handleHumidity);
        socket.on('illuminance', this.__handleIlluminance);
    }
    disconnect() { this._socket.disconnect(); }
}
