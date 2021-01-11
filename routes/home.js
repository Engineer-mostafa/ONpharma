
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../core/user');

const { response, request } = require('express');

var nodemailer = require('nodemailer');
var qr = require('qr-image')
var fs = require('fs');

const user = new User();


router.get('/', (request, Response) => {

    console.log(typeof request.session.user);

    if ( !(request.session.user)) {
        console.log("render Home");
        Response.render('home', {
            title: "Home",
            css: "home",
            js: "home",
            img: "heart-rate.png",
            open: 1,
            errors: "",
            type: ""
        }
        );
        return;
    }
    else if ((request.session.opp === 0) && (request.session.user.User_type == "Doctor" || request.session.user.User_type == "Patient")) {
        console.log("p-D");
        console.log(request.session.opp);

        function coord2offset(x, y, size) {
            return (size + 1) * y + x + 1;
        }

        function customize(bitmap) {
            const size = bitmap.size;
            const data = bitmap.data;

            for (let x = 0; x < size; x++) {
                for (let y = 0; y < x; y++) {
                    const offset = coord2offset(x, y, size);
                    // If it's white change it's color
                    if (data[offset]) {
                        data[offset] = 255 - Math.abs(x - y);
                    }
                }
            }
        }
        qr.image(request.session.user.acc_ID, {
            type: 'png',
            customize
        }).pipe(
            fs.createWriteStream('F:/Mostafa/CMP 2/semester 1/DB-MS/Pharmacy App/public/images/custom.png')
        );

        console.log("i will send");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mostafamagdi999.mm@gmail.com',
                pass: 'Mosstafalover999'
            }
        });
   
        var mailOptions = {
            from: 'mostafamagdi999.mm@gmail.com',
            to: `${request.session.user.acc_email}`,
            subject: 'Sending Email using Node.js',
            //to accept base64 content in messsage
            attachments: [{   // stream as an attachment
                filename: 'image.jpg',
                content: fs.createReadStream('F:/Mostafa/CMP 2/semester 1/DB-MS/Pharmacy App/public/images/custom.png')
            }]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return Response.redirect('main-Hall');
    }
    else if (request.session.opp === 0 && request.session.user.User_type == "Pharmacist") {
        console.log("in pharma");
        function coord2offset(x, y, size) {
            return (size + 1) * y + x + 1;
        }

        function customize(bitmap) {
            const size = bitmap.size;
            const data = bitmap.data;

            for (let x = 0; x < size; x++) {
                for (let y = 0; y < x; y++) {
                    const offset = coord2offset(x, y, size);
                    // If it's white change it's color
                    if (data[offset]) {
                        data[offset] = 255 - Math.abs(x - y);
                    }
                }
            }
        }
        qr.image(request.session.user.acc_ID, {
            type: 'png',
            customize
        }).pipe(
            fs.createWriteStream('F:/Mostafa/CMP 2/semester 1/DB-MS/Pharmacy App/public/images/custom.png')
        );

        console.log("i will send");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mostafamagdi999.mm@gmail.com',
                pass: 'Mosstafalover999'
            }
        });
       
        var mailOptions = {
            from: 'mostafamagdi999.mm@gmail.com',
            to: `${request.session.user.acc_email}`,
            subject: 'Sending Email using Node.js',
            //to accept base64 content in messsage
            attachments: [{   // stream as an attachment
                filename: 'image.jpg',
                content: fs.createReadStream('F:/Mostafa/CMP 2/semester 1/DB-MS/Pharmacy App/public/images/custom.png')
            }]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return Response.redirect('pharmacist-v');
    }
    else {
        Response.redirect('main-Hall')
    }
  

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
        .isLength({ max: 11 })
        .withMessage("The phone number lenght should be 11-number ")
        .isLength({ min: 11 })
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
                Response.render('home', {
                    title: "Home",
                    css: "home",
                    js: "home",
                    img: "heart-rate.png",
                    errors: errors.array(),
                    open: 1,
                    type: type,
                }
                );
                return;
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
                phoneNum: request.body.Mobilep,
                usertype: type

            };

            console.log('create')
            user.create(userInput, async function (lastID) {

                try {
                    if (await lastID) {
                        console.log(lastID);
                        switch (request.body.type) {

                            case "Doctor":
                                var doctor_input = {
                                    doc_id: lastID,
                                    doc_special: request.body.Doc_special,
                                    doc_degree: request.body.Doc_deg,
                                    doc_address: request.body.Doc_address
                                }
                                user.CreateDoctor(doctor_input);
                                break;

                            case "Pharmacist":
                                user.CreatePharmacist(lastID);
                                break;


                        };
                        user.find_id(lastID).then(function (user) {

                            if (user) {
                                console.log("after create")
                                request.session.user = user;
                                request.session.opp = 0;
                                console.log("befor redirect");
                                console.log("i will redirect soon");
                                return Response.redirect('home');

                            }

                        })
                    }

                }
                catch {
                    response.status(400).send(error);

                }
            })
        }
        else {

            user.login(request.body.Emaill, request.body.Passwordl, function (result) {

                console.log('home');
                console.log(result);
                

                if (result) {
                    console.log('home in result');
                     console.log(result);

                    request.session.user = result;
                    request.session.opp = 1

                    console.log("Sucssefully .....Login " + result.acc_email);
                    if (request.session.user.User_type == "Pharmacist") {
                        return Response.redirect('pharmacist-v');


                    }
                    else if (request.session.user && request.session.user.User_type != "Admin") {
                        return Response.redirect('main-Hall');

                    }
                    else if (request.session.user) {
                        return Response.redirect('profile');

                    }
                    else {
                        console.log("render Home");
                        Response.render('home', {
                            title: "Home",
                            css: "home",
                            js: "home",
                            img: "heart-rate.png",
                            open: 0,
                            errors: "",
                            type: ""
                        }
                        );
                        return;
                    }

                } else {

                  return  Response.render('home', {
                        title: "Home",
                        css: "home",
                        js: "home",
                        img: "heart-rate.png",
                        errors: ["Email or Password is incorrect"],
                        open: 1,
                        type: "Login"
                    }
                    );

                    ;
                }
              
               
            })



        }


    });

module.exports = router;