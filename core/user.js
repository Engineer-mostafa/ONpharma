const pool = require('./Pool');
const bcrypt = require('bcrypt');


function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'acc_email';
        }
        // prepare the sql query
        let sql = `SELECT * FROM account WHERE ${field} =  ?` ;

        
        pool.query(sql, user, function(err, result) {
            if(err) {throw err}

           else if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object 
    create : function(body, callback) 
    {

        var pwd = body.password;
       
        // Hash the password before insert it into the database.
         body.password = bcrypt.hashSync(pwd,10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            
            bind.push(body[prop]);
        }
        // validate 
        this.find(acc_email, function(user) {
            // if there is a user by this username.
            
            if(user) {
                // now we check his password.
                throw 'Username "' + user.acc_email + '" is already taken';
            }
        });
        // prepare the sql query
        let sql = `INSERT INTO account (acc_email,acc_password,Fname,Mname,Lname,gender,Bdata,phoneNum) VALUES ( ?,?,?,?,?,?,?,?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, async function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },

    login : function(acc_email, password, callback)
    {
        
        // find the user data by his username.
        this.find(acc_email, function(user) {
            // if there is a user by this username.
            
            if(user) {
                // now we check his password.
                if(bcrypt.compareSync(password, user.password)) {
                    // return his data.
                    callback(user);
                    return;
                }  
            }
            else            // if the username/password is wrong then return null.
            callback(null);
        });
        
    }

}

module.exports = User;