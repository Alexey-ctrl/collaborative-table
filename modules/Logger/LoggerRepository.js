const BaseRepository = require('../Base/BaseRepository');

class LoggerRepository extends BaseRepository {
  get _tableName() {
    return 'logs';
  }

  async getActiveUserLogins(actionName, startDate, endDate, minActions = 3) {
    const result = await this._pg.execute(
      `select u.login, l.action, count(l) as action_count
       from logs l
                left join users u on u.id = l.user_id
       where l.created_at >= $1
         and l.created_at < $2
         and l.action = $3
       group by u.login, l.action
       having count(l) >= $4
       order by u.login, action_count desc`, [startDate, endDate, actionName, minActions]
    );
    return result.rows;
  }
}

module.exports = LoggerRepository;
