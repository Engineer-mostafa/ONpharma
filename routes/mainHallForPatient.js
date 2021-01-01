
const router = require('express').Router();
const pool = require('../core/Pool');
const { request } = require('express');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');


router.get('/', (request, Response) => {



    Response.render('mainHallForPatient', {
        title: "Main Hall",
        css: "mainHallForPatient",
        js: "mainHallForPatient"

    }
    );
});



router.post('/', (req, res) => {

    console.log("in medical Post");
    var result;
    console.log(req.body.type);

    switch (req.body.type  /*data i get from ajax object*/) {
        case "search":
            pool.query("SELECT * FROM SCAN ", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY1");

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

                    console.log("FETCHED SUCCEFULLY2");

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

                    console.log("FETCHED SUCCEFULLY3");

                    res.end(
                        result
                    );
                }
            });
            break;


        case "getMyPatients":
            pool.query("SELECT * FROM patient;", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY4");

                    res.end(
                        result
                    );
                }
            });
            break;
        
        
        case "chronicDisease":
            pool.query("SELECT * FROM chronic_disease", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    //console.log("FETCHED SUCCEFULLY5");

                    res.end(
                        result
                    );
                }
            });
            break;
        
        default:
            console.log("i Will Download File");
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var oldpath = files.filetoupload.path;
                console.log(oldpath);
                var newpath = 'F:/Mostafa/CMP 2/semester 1/DB-MS/Pharmacy App/public/pdfs/' + files.filetoupload.name;
                mv(oldpath, newpath, function (err) {
                    if (err) throw err;
                    res.render('mainHallForPatient', {
                        title: "Main Hall",
                        css: "mainHallForPatient",
                        js: "mainHallForPatient"

                    }
                    );
                });
            });
            break;

    }



});
module.exports = router;