const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Autos_Colombia',
    password: 'admin',
    port: 5433, // Puerto predeterminado de PostgreSQL
});

module.exports = pool;
