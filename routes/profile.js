const router = require('express').Router();
const ASPC = require('../core/patient_ASPC');
var aspc = new ASPC();

router.get('/', (request, Response) => {

    console.log("in Profile get");
    if (typeof (request.session.user) == "undefined") {
        Response.redirect('home');
    }
    else {
        console.log("render profile");
        Response.render('profile', {
            title: "Profile",
            css: "profile",
            js: "profile",
            img: request.session.user.User_type == "Patient" ? "patient.png" : "checklist.png",
            name: request.session.user.Fname + " " + request.session.user.Mname + " " + request.session.user.Lname,
            email: request.session.user.acc_email,
            bd: request.session.user.Bdate,
            phone: request.session.user.phoneNum,
            type: request.session.user.User_type,

        }
        );
    }
});

router.post('/', (req, res) => {

    console.log(req.body);
    // create New Admin
    switch (req.body.type) {
        case "ifone":
            aspc.ifOne(req.body.id, res.end);
            break;
        case "createadmin":
            aspc.createAdmin(req.body.id, res.end);
            break;
        case "password":
            aspc.changePass(req.session.user.acc_ID, req.body.pass, res.end);
            break;
        case "destroy":
            console.log("Destroy" + req.session.user.User_type)
            if (req.session.user.User_type == "Pharmacist") {
                console.log("pharma");
                req.session.destroy(function () {
                    res.redirect('pharmacist-v');
                });
                break;
            }
            else {
                req.session.destroy(function () {
                    res.redirect('main-Hall');
                });
            }

            break;
    }
});



module.exports = router;