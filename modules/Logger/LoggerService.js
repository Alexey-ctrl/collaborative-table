const LoggerRepository = require('./LoggerRepository');

class LoggerService {
  constructor() {
    this._loggreRepository = new LoggerRepository();
  }

  async log(action) {
    return this._loggreRepository.create(action);
  }

  async getActiveUserLogins(action, startDate, endDate, minActions) {
    return this._loggreRepository.getActiveUserLogins(action, startDate, endDate, minActions);
  }
}


module.exports = LoggerService;
