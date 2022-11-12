const path = require('path');
const config = require('./config');
const routes = require('./routes');
const Server = require('./lib/Server');
const WebSocket = require('./lib/WebSocket');

const httpServer = new Server();
const {port, host} = config.server;
const publicPath = path.join(__dirname, 'public');

httpServer
  .addStatic(publicPath)
  .addRoutes(routes)
  .listen(port, host);

WebSocket.start(httpServer);
