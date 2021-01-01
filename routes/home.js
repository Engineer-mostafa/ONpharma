

const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../core/user');
const { response } = require('express');

const user = new User();

router.get('/', (request, Response) => {


    
    Response.render('home', {
        title: "Home",
        css: "home",
        js: "home"

    }
    );
});


router.post('/', (request, Response) => {
    
    var type = request.body.type;

    // for signup authontucation 
    if (type == "Patient" || type == "Doctor" || type == "Pharmacist") {
        //getting user information from user
        var  gender =-1
        if (request.body.Genderp)
        {
            gender =1
        }
        else
        {
            gender =0 ;
        }

        var s = request.body.Bdate;
        var userInput = {
            email: request.body.Emailaddressp,
            password: request.body.Passwordp,
            firstname: request.body.FirstNamep,
            Minname: request.body.MNamep,
            Lastname: request.body.LastNamep,
            gender: gender,
            Birthdate:  s ,
            phoneNum: request.body.Mobilep

        };
        user.create(userInput,async function(lastID) {
            if (lastID) {
    
                    switch (request.body.type) {
                        case "Patient":
                            user.Createpatient(lastID);
                            break;
                        case "Doctor":
                            user.CreateDoctor(lastID);
                            break;

                        case "Pharmacist":
                            user.CreatePharmacist(lastID);
                            break;
                    }
                   //  redirect the user to the main page.
                     Response.redirect('/mainHallForPatient');


            }
            
            else {
                console.log('Error creating a new user ....');
            };


        })
    }else {
        user.login(request.body.Emaill, request.body.Passwordl, function (result) {
           
            if (result) {
               
              // console.log(result);
                console.log("Sucssefully .....Login "+ result.acc_email);
                // redirect the user to the home page.
                Response.redirect('/mainHallForPatient');
            } else {

                Response.send('Username or Password incorrect!');
            }
        })
    }



    Response.render('home', {
        title: "Home",
        css: "home",
        js: "home"

    }
    );
});

module.exports = router;