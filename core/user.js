const pool = require('./Pool');
const bcrypt = require('bcrypt');
const { request, response } = require('express');


function User() { };

User.prototype = {

    // This function will search data in the database. 
    // Find the user data by account id or username.

    find: function (user = null, callback) {
        // if the user variable is defind
        if (user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'acc_ID' : 'acc_email';
        }

        // prepare the sql query
        let sql_query = `SELECT * FROM account where  ${field}  = ? `;


        return pool.query(sql_query, user).then (function (result) {
           
                if (result.length > 0) {
                    callback(result[0]);
                } else {
                    callback(null);
                }
            }
        ).catch(function(err){
              throw err ;
        });
    },
    find_mobile_phone: function (mobile = null) {
        
        if (mobile) {
            let sql_query =`SELECT * FROM account where  phoneNum  = ? `


           return pool.query(sql_query , mobile ).then( function(result){
               return result[0];
            }).catch(function(err){
                throw err ;
            });
           
        }
    },
    find_id: function (id = null) {
        
        if (id) {
            let sql_query =`SELECT * FROM account where  acc_ID  = ? `


           return pool.query(sql_query , id ).then( function(result){
               return result[0];
            }).catch(function(err){
                throw err ;
            });
           
        }
    },
   find_mail_for_one :function(mobile =null){
    if (mobile) {
        let sql_query = `SELECT * FROM account where  acc_email  = ? `;

       return pool.query(sql_query , mobile ).then( function(result){
           return result[0];
        }).catch(function(err){
            throw err ;
        });
        

    }

   },
    // This function will insert data into the database. (create a new user)
    // body is an object 
    create: function (body, callback) {

        var pwd = body.password;

        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd, 10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for (prop in body) {

            bind.push(body[prop]);
        }
       
        // prepare the sql query
        let sql = `INSERT INTO account (acc_email,acc_password,Fname,Mname,Lname,gender,Bdate,phoneNum) VALUES (?,?,?,?,?,?,?,?) `;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind).then ( function ( result) {

            callback(result.insertId);

        }).catch(function(err){
            throw err ;
        });

    },

    login: function (user, password, callback) {
        console.log("login");

        // find the user data by his username.
        this.find(user, function (userID) {
            // if there is a user by this username.rs

            if (userID) {

                // now we check his password.
                if (bcrypt.compareSync(password, userID.acc_password)) {
                    // return his data.


                    callback(userID);

                }

            }
            // if the username/password is wrong then return null.
            {
                callback(null);

            }


        });

    },
    Createpatient: function (user) {
        // getting user id 
        var ID = user
        let sql = `INSERT INTO Patient (Patient_acc_ID) VALUES (?) `;

        // call the query give it the sql string and the value (user id )
        pool.query(sql, ID).then( function ( result) {
           
            // return the last inserted id. if there is no error
           console.log('inserted Patient successfully....');
           
        }).catch(function(err){
            throw err ;
        });
        return ;
    },
    
    CreateDoctor: function (user) {
        if (user) {

            
            let sql = `INSERT INTO Doctor ( doctor_acc_ID , doctor_degree , doctor_specialization , doctor_address ) VALUES ( ${user.doc_id} , '${user.doc_degree}' , '${user.doc_special}' , '${user.doc_address}' )`;
            
            // call the query give it the sql string and the values (bind array)
            pool.query(sql).then( function( result) {

                console.log('inserted Doctor successfully....');
                return ;
            }).catch(function(err){
                throw err ;
            });
          
        }
        
    },

    CreatePharmacist: function (user ) {
        if (user) {
            var ID = user
            let sql = `INSERT INTO Pharmacist (Pharmacist_acc_ID) VALUES ( ?)`;
            // call the query give it the sql string and the values (bind array)
            pool.query(sql, ID).then ( function ( result) {
                // return the last inserted id. if there is no error
                console.log('inserted pharmacist successfully....');
                return ;
            }).catch(function(err){
                throw err ;
            });


        }
    

    }


}

module.exports = User;