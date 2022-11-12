const BaseRepository = require('../Base/BaseRepository');

class UserRepository extends BaseRepository {
  get _tableName() {
    return 'users';
  }

  async getByLogin(login) {
    const result = await this._pg.execute(`select * from ${this._tableName} where login = $1`, [login]);
    return this._first(result.rows);
  }
}

module.exports = UserRepository;
