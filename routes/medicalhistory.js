

const router = require('express').Router();
const ASPC = require('../core/patient_ASPC');
const pool = require('../core/Pool');
const { request } = require('express');

var aspc = new ASPC();


router.get('/', (request, Response) => {

    console.log("in medical get");

    if (typeof (request.session.user) == "undefined") {
        Response.redirect('home');
    }
    else {
        Response.render('medicalhistory', {
            title: "Medical History",
            css: "medicalhistory",
            js: "medicalhistory",
            img: "patient.png"
        }
        );
    }
});


router.post('/', (req, res) => {

    if (typeof (req.session.user) == "undefined") {
        res.redirect('home');
        return;
    }
    console.log("in medical Post");
    var result;
    console.log(req.body.type);
    var id = req.session.user.acc_ID;
   //should modified for current user id 
    switch (req.body.type  /*data i get from ajax object*/) {
        case "Scan":
            aspc.getScan(id, res.end);
            break;
        
        case "Analysis":
            aspc.getAnalysis(id, res.end);

            break;  
        case "Prescriptions":
            aspc.getPrescriptions(id, res.end);

            break;
        default:
            aspc.getCoronicDisease(id, res.end);
            break;

    }

});

module.exports = router;