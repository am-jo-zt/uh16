import Server from 'socket.io';

const INTERVAL__TEMPERATURE = 5000,
      INTERVAL__HUMIDITY = 5000,
      INTERVAL__LUMINOSITY = 5000;

let _server = new Server().attach(9001),
    _ivlTemperature,
    _ivlHumidity,
    _iterTemp = _generateTemperature(),
    _iterHumidity = _generateHumidity();

// Initialization

init();

function init() {
    _initServer();
    _ivlTemperature = setInterval(__emitTemperature, INTERVAL__TEMPERATURE);
    _ivlHumidity = setInterval(__emitHumidity, INTERVAL__HUMIDITY);
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

function* _generateHumidity() {
    let humidity = 45;
    while(1) {
        yield humidity + (4 * Math.random()) - 2;
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

function __emitHumidity() {
    _server.emit('state', {
        type: 'HUMIDITY',
        timestamp: Date.now(),
        value: _iterHumidity.next().value
    });
}

function __onConnection(socket) {
    console.log(`New connection ${socket.id}`);
    socket.on('disconnect', __onDisconnect);
}

function __onDisconnect(socket) {
    console.log(`Disconnected`);
}
