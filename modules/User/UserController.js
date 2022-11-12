const BaseController = require('../Base/BaseController');
const UserService = require('./UserService');
const SessionService = require('../Session/SessionService');
const LoggerService = require('../Logger/LoggerService');
const LoggerAction = require('../Logger/LoggerAction');
const HttpException = require('../../lib/HttpException');

class UserController extends BaseController {
  constructor() {
    super();
    this._userService = new UserService();
    this._sessionService = new SessionService();
    this._loggerService = new LoggerService();
  }

  async singUp(req) {
    const {login, password} = await this.parseBody(req);
    if (!login || !password) throw HttpException.MissingRequiredParameter;
    const user = await this._userService.singUp(login, password);
    await this._loggerService.log(LoggerAction.singUp(user));

    const cookie = await this._createUserCookieSession(req, user);
    return {cookie};
  }

  async login(req) {
    const {login, password} = await this.parseBody(req);
    if (!login || !password) throw HttpException.MissingRequiredParameter;

    const user = await this._userService.checkValidUser(login, password);
    if (!user) throw HttpException.AuthenticationFailed;
    await this._loggerService.log(LoggerAction.login(user));

    const cookie = await this._createUserCookieSession(req, user);
    return {cookie};
  }

  async logout(req) {
    const cookies = this.parseCookie(req);
    const deletedCookies = this.clearCookie(cookies);
    if (cookies.sessionId) {
      const user = await this._sessionService.getSessionUser(cookies.sessionId);
      if (user) await this._loggerService.log(LoggerAction.logout(user));
      await this._sessionService.deleteById(cookies.sessionId);
    }
    return {cookie: deletedCookies};
  }

  async getActiveUsers(req) {
    const {actionName, startDate, endDate, minActions} = await this.parseBody(req);
    if (!startDate || !endDate || !actionName) throw HttpException.MissingRequiredParameter;

    const users = await this._loggerService.getActiveUserLogins(actionName, startDate, endDate, minActions);
    return {data: JSON.stringify(users), contentType: 'application/json'};
  }

  async _createUserCookieSession(req, user) {
    const {sessionId} = this.parseCookie(req);
    if (sessionId) await this._sessionService.deleteById(sessionId);
    const newSession = await this._sessionService.create(user.id);
    return this.generateCookie({
      sessionId: newSession.id,
      userLogin: user.login
    });
  }
}

module.exports = new UserController();
