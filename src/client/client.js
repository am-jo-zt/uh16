import io from 'socket.io-client';

export default class Client {
    constructor(url, { onConnect, onState, onDisconnect }) {
        this._url = url;
        this.__onConnect = onConnect;
        this.__onState = onState;
        this.__onDisconnect = onDisconnect;
    }

    connect() {
        let socket = this._socket = io(this._url);
        socket.on('connect', this.__onConnect);
        socket.on('state', this.__onState);
        socket.on('disconnect', this.__onDisconnect);
    }
    disconnect() {
        this._socket.disconnect();
    }
}
