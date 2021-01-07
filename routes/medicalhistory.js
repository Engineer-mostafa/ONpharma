

const router = require('express').Router();
const ASPC = require('../core/patient_ASPC');
const pool = require('../core/Pool');
const { request } = require('express');



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
            pool.query("SELECT * FROM SCAN ", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY");

                    res.end(
                        result
                    );
                }
            });
            break;
        case "Analysis":
            pool.query("SELECT * FROM analysis ", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY");

                    res.end(
                        result
                    );
                }
            });
            break;  
        case "Prescriptions":
            pool.query("SELECT * FROM prescription ", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY");

                    res.end(
                        result
                    );
                }
            });
            break;
        default:
            pool.query("SELECT * FROM chronic_disease", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY");

                    res.end(
                        result
                    );
                }
            });
            break;

    }




});

module.exports = router;