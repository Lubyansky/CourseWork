const Pool = require('pg').Pool
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: '63947',
    port: 5432,
    database: "Kiku"
})

/*pool.connect();

pool.query(`SELECT * FROM public."Articles"`, (err, res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message)
    }
    pool.end;
})*/

module.exports = pool