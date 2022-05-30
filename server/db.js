const Pool = require('pg').Pool
const pool = new Pool({
    host: "127.0.0.1",
    user: "postgres",
    password: '63947',
    port: 5432,
    database: "Kiku"
})

module.exports = pool