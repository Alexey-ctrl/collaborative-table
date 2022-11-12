const BaseRepository = require('../Base/BaseRepository');

class SessionRepository extends BaseRepository {
  get _tableName() {
    return 'sessions';
  }

  async getSessionUser(sessionId) {
    const result = await this._pg.execute(
      `select *
       from ${this._tableName} s
                join users u on s.user_id = u.id
       where s.id = $1`, [sessionId]
    );
    return this._first(result.rows);
  }
}

module.exports = SessionRepository;
