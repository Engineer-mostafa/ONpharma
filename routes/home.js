
const jwt = require('jsonwebtoken');


const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../core/user');

const { response, request } = require('express');

//FOR OUR VALIDATION
const Joi = require('@hapi/joi');
//schema for validation 

const user = new User();
router.get('/', (request, Response) => {



    Response.render('home', {
        title: "Home",
        css: "home",
        js: "home",
        img:"heart-rate.png"

    }
    );
});
const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    firstname: Joi.string().min(3).required(),
    Minname: Joi.string().min(3).required(),
    Lastname: Joi.string().min(3).required(),
    gender: Joi.number().integer().required(),
    Birthdate: Joi.string().required(),
    phoneNum: Joi.number().integer().min(10).required()
}
)

router.post('/', (request, Response) => {

    var type = request.body.type;

    // for signup authontucation 
    if (type == "Patient" || type == "Doctor" || type == "Pharmacist") {
        //getting user information from user
        var gender = -1
        if (request.body.Genderp) {
            gender = 1
        }
        else {
            gender = 0;
        }

        var s = request.body.Bdate;
        var userInput = {
            email: request.body.Emailaddressp,
            password: request.body.Passwordp,
            firstname: request.body.FirstNamep,
            Minname: request.body.MNamep,
            Lastname: request.body.LastNamep,
            gender: gender,
            Birthdate: s,
            phoneNum: request.body.Mobilep

        };
        // VALIDATE DATA BEFORE MAKING A USER
       
            const {error} = schema.validate(userInput);
            //IF there is error then we don't create user  
            if (error)
            { 
                //respose
           return console.log(error.details[0].message) ;
            }
        
        

        user.create(userInput, async function (lastID) {

            try {
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
                    Response.redirect('/medicalhistory');


                }

            }
            catch {
                response.status(400).send(error);
                

            }

        })
    } else {
        user.login(request.body.Emaill, request.body.Passwordl, function (result) {

            if (result) {

                // console.log(result);
                console.log("Sucssefully .....Login " + result.acc_email);

                console.log(result.acc_ID);
                // CREATE and assign a token
                const token = jwt.sign({_id:result.acc_ID},"secretkey");
                console.log(token);
                
                // response.setheader({"Cookies":token});
                // redirect the user to the home page.
                 // response.redirect('/medicalhistory');
                  
              
                
            } else {

               return  Response.status(400).send('Username or Password incorrect!');
            }
        })
    }



    Response.render('home', {
        title: "Home",
        css: "home",
        js: "home",
        img: "heart-rate.png"
    }
    );
});

module.exports = router;