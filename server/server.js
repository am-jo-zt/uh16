import Server from 'socket.io';

const INTERVAL = 5000;

let _server = new Server().attach(9001),
    _iterTemp = _generateTemperature(),
    _iterHumidity = _generateHumidity();

// Initialization

init();

function init() {
    _initServer();
    emitTemperature();
    emitHumidity();
}

function _initServer() {
    _server.on("connection", __onConnection);
}

function emitTemperature() { setTimeout(__emitTemperature, rndTimeout()); }
function emitHumidity() { setTimeout(__emitHumidity, rndTimeout()); }

function rndTimeout() { return Math.random() * INTERVAL; }

// Generators

function* _generateTemperature() {
    let temperature = 22;
    while(1) {
        yield temperature + Math.random() - 0.5;
    }
}

function* _generateHumidity() {
    let humidity = 45;
    while(1) {
        yield humidity + (4 * Math.random()) - 2;
    }
}

// Callbacks

function __emitTemperature() {
    _server.emit('temperature', {
        timestamp: Date.now(),
        value: _iterTemp.next().value
    });
    emitTemperature();
}

function __emitHumidity() {
    _server.emit('humidity', {
        timestamp: Date.now(),
        value: _iterHumidity.next().value
    });
    emitHumidity();
}

function __onConnection(socket) {
    console.log(`New connection ${socket.id}`);
    socket.on('disconnect', __onDisconnect);
}

function __onDisconnect(socket) {
    console.log(`Disconnected`);
}
