const http = require('http');
const path = require('path');
const fs = require('fs');
const httpException = require('./HttpException');
const pg = require('./Pg');
const {HttpException} = require("./HttpException");

class Server {
  constructor() {
    this._staticPath = null;
    this._routes = {};
    this._server = http.createServer(this._onRequest.bind(this));
  }

  listen(port, host = 'localhost') {
    this._server.listen(port, host, () => console.log(`Server started on http://${host}:${port}`));
    return this;
  }

  addStatic(staticPath) {
    this._staticPath = staticPath;
    return this;
  }

  addRoutes(routes) {
    this._routes = {...this._routes, ...routes};
    return this;
  }

  get _routeType() {
    return {
      static: async filename => {
        const data = await this._readStatic(filename);
        return {data};
      },
      controller: async (controller, req) => controller(req)
    }
  }

  async _onRequest(req, res) {
    try {
      const url = req.url;
      if (this._staticPath) {
        const file = await this._readStatic(url);
        if (file) return res.end(file);
      }

      if (this._routes && this._routes[url]) {
        const data = await this._routeHandler(req, res);
        if (data) return res.end(data);
      }

      this._sendHttpException(res, httpException.ResourceNotFound);
    } catch (error) {
      console.error({error});
      const httpError = this._errorHandler(error);
      this._sendHttpException(res, httpError);
    }
  }

  async _readStatic(filename) {
    const filepath = path.join(this._staticPath, filename);
    try {
      return await fs.promises.readFile(filepath, "utf-8");
    } catch (e) {
      return null;
    }
  }

  async _routeHandler(req, res) {
    const route = this._routes[req.url][req.method.toLowerCase()];
    if (!route) return null;

    const {data, status, contentType, cookie} = await this._routeType[route.type](route.value, req);
    if (contentType) res.setHeader('Content-type', contentType);
    if (cookie) res.setHeader('Set-cookie', cookie);
    res.writeHead(status || 200);
    return data || JSON.stringify({result: 'ok'})
  }

  _errorHandler(error) {
    let httpError = httpException.InternalError;
    if (error instanceof httpException.HttpException) httpError = error;
    else if (error.code && error.message) {
      let pgException = new HttpException(400, error.code, error.message);
      if (httpException[pg.expention[error?.code]]) pgException = httpException[pg.expention[error?.code]];
      httpError = pgException;
    }
    return httpError;
  }

  _sendHttpException(res, error) {
    res.writeHead(error.status, {'Content-type': 'application/json'});
    res.end(error.toString());
  }
}

module.exports = Server;
