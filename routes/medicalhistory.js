

const router = require('express').Router();
const ASPC = require('../core/patient_ASPC');
const pool = require('../core/Pool');
const { request } = require('express');

var aspc = new ASPC();


router.get('/', (request, Response) => {

    console.log("in medical get");


Response.render('medicalhistory', {
        title: "Medical History",
        css: "medicalhistory",
        js: "medicalhistory",
        img:"patient.png"
    }
    );
});


router.post('/', (req, res) => {

    console.log("in medical Post");
    var result;
    console.log(req.body.type);
   //should modified for current user id 
    switch (req.body.type  /*data i get from ajax object*/) {
        case "Scan":
            aspc.getScan(1, res.end);
            break;
        case "Analysis":
            aspc.getAnalysis(1, res.end);

            break;  
        case "Prescriptions":
            aspc.getPrescriptions(1, res.end);

            break;
        default:
            aspc.getCoronicDisease(1, res.end);

            break;

    }

});

module.exports = router;