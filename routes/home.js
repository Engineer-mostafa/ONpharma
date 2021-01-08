
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../core/user');

const { response, request } = require('express');


const user = new User();


router.get('/', (request, Response) => {

    let user = request.session.user;
    // If there is a session named user that means the use is logged in
    //so we redirect him to home page by using /home route below

    if (user) {
        Response.redirect('/main-hall');
    }

    Response.render('home', {
        title: "Home",
        css: "home",
        js: "home",
        img: "heart-rate.png",

    }
    );

});



router.post('/',
    // password - validation 
    body('Passwordp')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
    // email - validation 
    body("Emailaddressp", "E-mail already in use").custom((value) => {

        return user.find_mail_for_one(value).then(function (user) {

            if (user) {

                return Promise.reject("E-mail already in use");
            }

        })

    }),
    //first name - validation
    body("FirstNamep")
        .isString()
        .withMessage("First name must be string with min lenght 2")
        .isLength({ min: 3 })
        .withMessage('First name length should at least 3'),
    //min name - validation 
    body("MNamep")
        .isString()
        .withMessage("Min Name must be string with min lenght 2")
        .isLength({ min: 3 })
        .withMessage('Min Name length should at least 3'),
    //last name - validation
    body("LastNamep")
        .isString()
        .withMessage("Last name must be string with min lenght 2")
        .isLength({ min: 3 })
        .withMessage('Last name length should at least 3'),
    //mobile number - validation
    body("Mobilep", "This phone-number already in use")
        .isLength({ max: 11 }, { min: 11 })
        .withMessage("The phone number lenght should be 11-number ")
        .custom((value) => {
            return user.find_mobile_phone(value).then(function (user) {
                if (user) {

                    return Promise.reject("This phone-number already in use");
                }

            })

        }),


    async (request, Response) => {

        var type = request.body.type;

        // for signup authontucation 
        if (type == "Patient" || type == "Doctor" || type == "Pharmacist") {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                console.log(errors.array());

                return Response.status(400).json({ errors: errors.array() });
            }
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

            console.log('create')
            user.create(userInput, async function (lastID) {

                try {
                    if (await lastID) {
                        console.log(lastID);
                        switch (request.body.type) {
                            case "Patient":
                                user.Createpatient(lastID);

                                break;
                            case "Doctor":
                                var doctor_input= {
                                doc_id : lastID,
                                doc_special:request.body.Doc_special,
                                doc_degree : request.body.Doc_deg,
                                doc_address: request.body.Doc_address
                                }
                                user.CreateDoctor(doctor_input);
                                break;

                            case "Pharmacist":
                                user.CreatePharmacist(lastID);
                                break;


                        };
                    }

                }
                catch {
                    response.status(400).send(error);

                }
                user.find_id(lastID).then(function (user) {

                    if (user) {
                        request.session.user = user;
                        request.session.opp = 0;
                        console.log(request.session.user);
                    }

                })

               
                    Response.redirect('/home');
                    
                



            })
        } else {

            user.login(request.body.Emaill, request.body.Passwordl, async function (result) {

                console.log('home');

                if (await result) {


                    request.session.user = result;
                    request.session.opp = 1

                    console.log("Sucssefully .....Login " + result.acc_email);



                } else {

                    return Response.status(400).send('Username or Password incorrect!');
                }


                if (request.session.user)
                    Response.redirect('/main-hall');


            })



        }






    });

module.exports = router;