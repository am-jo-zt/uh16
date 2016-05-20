import WebSocketServer from 'websocketserver';

let _server = new WebSocketServer('all', 9000),
    _connectionList = [],
    _intervalTemperature,
    _iterTemp = _generateTemperature();

// Initialization

init();

function init() {
    _initServer();
    _intervalTemperature = setInterval(__emitTemperature, 1000);
}

function _initServer() {
    _server.on("connection", __onConnect);
    _server.on("closedconnection", __onDisconnect);
}

function* _generateTemperature() {
    let temperature = 22;
    while(1) {
        yield temperature + Math.random() - 0.5;
    }
}

// Callbacks

function __emitTemperature() {
    let data = {
        type: 'TEMPERATURE',
        timestamp: Date.now(),
        value: _iterTemp.next().value
    };
    _server.sendMessage('all', JSON.stringify(data));
}

function __onConnect(id) { console.log(`New connection ${id}`); }

function __onDisconnect(id) {
    _connectionList = _connectionList.filter(cur => cur !== id);
    console.log(`Connection ${id} has left the server. Connected clients left: ${_connectionList.length}`);
}
