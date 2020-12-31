

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
    //try to use express-validator for validation the data
    //try to use express-messeges to return messege in error
    //try to use express-session to return user to reconnect
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
                user.find(lastID, function (result) {
                    switch (request.body.type) {
                        case "Patient":
                            console.log("Patient");
                            user.Createpatient(lastID);
                            break;
                        case "Doctor":
                            console.log("Doctor");
                            user.CreateDoctor(lastID);
                            break;

                        case "Pharmacist":
                            console.log("Pharmacist");
                            user.CreatePharmacist(lastID);
                            break;
                    }
                    // redirect the user to the main page.
                     Response.redirect('mainHallForPatient');


                }
                )
            }

            else {
                console.log('Error creating a new user ....');
            };


        })
    }else {
        user.login(request.body.Emailaddressp, request.body.password, function (result) {
            if (result) {// Store the user data in a session.
               
                // redirect the user to the home page.
                Response.redirect('/home');
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