const Pool = require('pg').Pool
const pool = new Pool({
    host: "5.206.92.193",
    user: "postgres",
    password: '63947',
    port: 5432,
    database: "Kiku"
})

module.exports = pool