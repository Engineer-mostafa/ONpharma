const util = require('util');
var mysql      = require('mysql');

const pool = mysql.createPool({
  host     : 'online-care-p.mysql.database.azure.com',
  user     : 'rootdb@online-care-p',
  password : 'databaseserver123456789$',
  database : 'pharmacy_app_db'
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
  
