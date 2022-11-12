const pg = require('pg');
const config = require('../config');

const pool = new pg.Pool(config.database);

module.exports.execute = async (queryText, params) => {
  const client = await pool.connect();
  const result = await client.query(queryText, params);
  client.release();
  return result;
}

module.exports.expention = {
  '23505': 'UserAlreadyExists'
}
