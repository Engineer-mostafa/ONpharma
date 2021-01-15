const util = require('util');
var mysql      = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE 
});
 
pool.getConnection((err, connection)=>{
    if (err) throw err ;
    else
    console.log("DB Connected to my sql"); 
    if (connection)
    connection.release() ;
    return;
});

  pool.query = util.promisify(pool.query);
  module.exports=pool ;
  
