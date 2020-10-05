const { Pool } = require('pg');

if (process.env.NODE_ENV === 'production') {
  const connectionString = process.env.DATABASE_URL;

  const pool = new Pool({
    connectionString: connectionString,
  });

  module.exports = {
    query: (text, params) => pool.query(text, params)
  }
} else {
  const pool = new Pool();

  module.exports = {
    query: (text, params) => pool.query(text, params)
  }
}