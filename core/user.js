const pool = require('./Pool');
const bcrypt = require('bcrypt');
const { request } = require('express');


function User() {};

User.prototype = {

    // This function will search data in the database. 
    // Find the user data by account id or username.

    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'acc_ID' : 'acc_email';
        }
        
        // prepare the sql query
        let sql_query ="SELECT * FROM account where acc_email = ? "  ;

        
        pool.query(sql_query,user,function(err, result) {
            if(err) {throw err}
           
            if(result.length) {
                callback(result);
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
        var accmail = body.email;
        
        
        // Hash the password before insert it into the database.
         body.password = bcrypt.hashSync(pwd,10);
         
        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            
            bind.push(body[prop]);
        }
        // validate 
        this.find(accmail, function(USERFOUND) {
            // if there is a user by this username
            
            try{
                if(USERFOUND) {
                // now we check his password.
                throw 'email "' + USERFOUND[0].acc_email + '" is already taken';
            }
        }
        catch{
            console.log('Accepted your mail')
        }
        });
        
        // prepare the sql query
        let sql = `INSERT INTO account (acc_email,acc_password,Fname,Mname,Lname,gender,Bdate,phoneNum) VALUES (?,?,?,?,?,?,?,?) `;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, async function(err, result) {
            if(err) throw err;
           
            callback(result);
        });
    },

    login : function(user, password, callback)
    {
        
        // find the user data by his username.
        this.find(user, function(userID) {
            // if there is a user by this username.
       
            if(userID) {
                // now we check his password.
                if(bcrypt.compareSync(password, userID[0].acc_password)) {
                    // return his data.
                    callback(userID[0]);
                    return;
                }  
            }
            else           
             // if the username/password is wrong then return null.
            callback(null);
        });
        
    },
    Createpatient : function(user )
    {
        // getting user id 
                var ID =user.insertId 
                let sql = `INSERT INTO Patient (Patient_acc_ID) VALUES (?) `;
               
                // call the query give it the sql string and the value (user id )
                pool.query(sql, ID, async function(err, result) {
                    if(err) throw err;
                    // return the last inserted id. if there is no error
                    console.log('inserted Patient successfully....');
                    return ;
                    
                });          
    },
    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    /////////////////should update for data base //////////////////
    //////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
     CreateDoctor : function(user )
    {     
          if(user) {
                var ID =user.insertId
                let sql = `INSERT INTO Doctor (doctor_acc_ID) VALUES ( ?)`;
                // call the query give it the sql string and the values (bind array)
                pool.query(sql, ID, async function(err, result) {
                    if(err) throw err;
                   
                    console.log('inserted Doctor successfully....');
                    return ;
                });
                
            }
    },
   
    CreatePharmacist : function(user )
    {
        if(user) {
                var ID =user.insertId
                let sql = `INSERT INTO Pharmacist (Pharmacist_acc_ID) VALUES ( ?)`;
                // call the query give it the sql string and the values (bind array)
                pool.query(sql, ID, async function(err, result) {
                    if(err) throw err;
                    // return the last inserted id. if there is no error
                    console.log('inserted pharmacist successfully....');
                });
                
            }
           
    }
        

}

module.exports = User;