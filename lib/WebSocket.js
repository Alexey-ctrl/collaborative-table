const {WebSocket, Server} = require('ws');
const {HttpException} = require('../lib/HttpException');

class WebSocketServer {
  static start(httpServer) {
    const server = new Server({server: httpServer._server});
    const routes = httpServer._routes;

    server.on('connection', (ws, request) => {
      ws.on('message', async data => {
        try {
          const {method, message} = JSON.parse(data);
          const route = routes[request.url][method];
          if (!route) return;
          const result = await route.value(request, message);
          WebSocketServer._broadcast(server, ws, result);
        } catch (error) {
          console.error({error});
          if (error instanceof HttpException) ws.send(error.toString());
        }
      });
    });
  }

  static _broadcast(server, ws, message) {
    server.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

module.exports = WebSocketServer;


