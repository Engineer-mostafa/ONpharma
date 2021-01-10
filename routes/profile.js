const router = require('express').Router();
const ASPC = require('../core/patient_ASPC');
var aspc = new ASPC();

router.get('/', (request, Response) => {

    console.log("in Profile get");
    if (typeof (request.session.user) == "undefined") {
        Response.redirect('home');
    }
    else {
        Response.render('profile', {
            title: "Profile",
            css: "profile",
            js: "profile",
            img: request.session.user.User_type == "Patient" ? "patient.png" : "checklist.png",
            name: request.session.user.Fname + " " + request.session.user.Mname + " " + request.session.user.Lname,
            email: request.session.user.acc_email,
            bd: request.session.user.Bdate,
            phone: request.session.user.phoneNum,

        }
        );
    }
});



module.exports = router;