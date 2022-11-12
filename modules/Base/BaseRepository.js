const pg = require('../../lib/Pg');

class BaseRepository {
  constructor() {
    this._pg = pg;
  }

  get _tableName() {
    throw new Error('Not implemented')
  }

  _first(data) {
    return data[0] || null;
  }

  async create(entity) {
    const fields = Object.keys(entity).join(', ');
    const values = Object.values(entity);
    const valuesTemplate = values
      .map((value, index) => '$' + (index + 1))
      .join(', ');

    const result = await this._pg.execute(
      `insert into ${this._tableName} (${fields})
       values (${valuesTemplate}) returning *`, values
    );
    return this._first(result.rows);
  }

  async deleteById(id, columnIdName = 'id') {
    return await this._pg.execute(
      `delete
       from ${this._tableName}
       where ${columnIdName} = $1`, [id]
    );
  }
}

module.exports = BaseRepository;
