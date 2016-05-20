import Server from 'socket.io';

let _server = new Server().attach(9001),
    _intervalTemperature,
    _iterTemp = _generateTemperature();

// Initialization

init();

function init() {
    _initServer();
    _intervalTemperature = setInterval(__emitTemperature, 1000);
}

function _initServer() {
    _server.on("connection", __onConnection);
}

function* _generateTemperature() {
    let temperature = 22;
    while(1) {
        yield temperature + Math.random() - 0.5;
    }
}

// Callbacks

function __emitTemperature() {
    _server.emit('state', {
        type: 'TEMPERATURE',
        timestamp: Date.now(),
        value: _iterTemp.next().value
    });
}

function __onConnection(socket) {
    console.log(`New connection ${socket}`);
    socket.on('disconnect', __onDisconnect);
}

function __onDisconnect(socket) {
    console.log(`Disconnected`);
}
