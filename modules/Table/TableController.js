const TableService = require('./TableService');
const SessionService = require('../Session/SessionService');
const BaseController = require('../Base/BaseController');
const LoggerService = require('../Logger/LoggerService');
const LoggerAction = require('../Logger/LoggerAction');
const HttpException = require('../../lib/HttpException');

class TableController extends BaseController {
  constructor() {
    super();
    this._tableService = new TableService();
    this._sessionService = new SessionService();
    this._loggerService = new LoggerService();
  }

  async getTable() {
    const table = await this._tableService.getTable();
    return {data: JSON.stringify(table)};
  }

  async updateCell(req, message) {
    const {event, row, column, value, isEdit} = message;

    if (event === 'focus' || event === 'focusout') {
      const {sessionId} = this.parseCookie(req);
      if (!sessionId) throw HttpException.NoAuthenticationInformation;

      const user = await this._sessionService.getSessionUser(sessionId);
      if (!user) throw HttpException.NoAuthenticationInformation;

      if (event === 'focus') await this._loggerService.log(LoggerAction.startEdit(user, {row, column}))
      if (event === 'focusout') await this._loggerService.log(LoggerAction.endEdit(user, {row, column, value}))
    }

    await this._tableService.updateCell(row, column, {value, isEdit});
    return {event: 'updateCell', message};
  }
}

module.exports = new TableController();
