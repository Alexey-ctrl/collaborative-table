const crypto = require('crypto');
const SessionRepository = require('./SessionRepository');

class SessionService {
  constructor() {
    this._sessionResository = new SessionRepository();
  }

  async create(userId) {
    const uuid = crypto.randomUUID();
    return this._sessionResository.create({id: uuid, user_id: userId});
  }

  async deleteById(id) {
    if (!this._isValidUuid(id)) return;
    return await this._sessionResository.deleteById(id);
  }

  async getSessionUser(sessionId) {
    if (!this._isValidUuid(sessionId)) return;
    return this._sessionResository.getSessionUser(sessionId);
  }

  _isValidUuid(uuid) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i.test(uuid)
  }
}

module.exports = SessionService;
