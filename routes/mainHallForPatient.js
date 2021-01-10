
const router = require('express').Router();
const pool = require('../core/Pool');
const { request } = require('express');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');
var nodemailer = require('nodemailer');
var QRCode = require('qrcode')
const ASPC = require('../core/patient_ASPC');
var aspc = new ASPC();



router.get('/',  (request, Response) => {
    console.log("in Main Hall Get");

    console.log(typeof (request.session.user));

    if (typeof(request.session.user) == "undefined") {
        Response.redirect('home');
    }
    else {
        Response.render('mainHallForPatient', {
        title: "Main Hall",
        css: "mainHallForPatient",
        js: "mainHallForPatient",
        img: "checklist.png",
        add: "",
        type: request.session.user.User_type,

    });
}

    
});



router.post('/', (req, res) => {

    console.log("in main hall Post");
    var result;
    console.log(req.body);
    if (typeof (req.session.user) == "undefined") {
        res.redirect('home');
        return;
    }
    var result;
    console.log(req.body.type);
    var id = req.session.user.acc_ID;
    switch (req.body.type  /*data i get from ajax object*/) {
        case "search":
            aspc.getScan(req.body.phone, res.end);
            break;
        case "Analysis":
            aspc.getAnalysis(req.body.phone, res.end);
            break;

        case "Prescriptions":
            aspc.getPrescriptions(req.body.phone, res.end);
            break;
        
        case "getMyPatients":
            aspc.getMyPatient(1,res.end);
            break;

        case "chronicDisease":
            aspc.getCoronicDisease(req.body.phone, res.end);
            break;

        case "search_for_pharmacy":
            aspc.search_for_pharmacy(req.body.searchField, res.end);
            break;

        case "search_for_Medicines":
            console.log(req.body.searchField);
            aspc.search_for_Medicines(req.body.searchField, res.end);
            break;
        default:
           
            console.log("i Will Download File default");
            var form = new formidable.IncomingForm();
            form.parse(req,  function (err, fields, files) {
                console.log(fields);
                switch (fields.typeoftheaddeditem) {
                    case "0":
                         pool.query("INSERT INTO scan (`Scan_Name`, `Scan_Date`, `Result`, `Patient_acc_ID`) VALUES ('" + fields.nameoftheitem + "','" + fields.dateofsubmition + "','" + files.filetoupload.name + "','" + fields.searchField + "');", (error, rows) => {
                            if (error)
                                throw error;
                            else {

                                result = JSON.stringify(rows);

                                console.log("added to scans succ");

                            }
                        });
                        break;
                    case "1":
                         pool.query("INSERT INTO analysis (`Analysis_Name`, `Analysis_Date`, `Result`, `Patient_acc_ID`) VALUES ('" + fields.nameoftheitem + "','" + fields.dateofsubmition + "','" + files.filetoupload.name + "','" + fields.searchField + "');", (error, rows) => {
                            if (error)
                                throw error;
                            else {

                                result = JSON.stringify(rows);

                            }
                        });

                        break;
                    case "2":
                        pool.query("INSERT INTO prescription (`Prescription_diagnosis`, `Prescription_date`, `Patient_acc_ID`, `doctor_acc_ID`) VALUES ('" + files.filetoupload.name + "','" + fields.dateofsubmition + "','" + fields.searchField + "' ,"+ id +" );", (error, rows) => {
                            if (error)
                                throw error;
                            else {

                                result = JSON.stringify(rows);

                                console.log("added to pres succ");
                            }
                        });
                        break;
                }
                var oldpath = files.filetoupload.path;
                //new path to save in our files
                var newpath = 'F:/Mostafa/CMP 2/semester 1/DB-MS/Pharmacy App/public/pdfs/' + files.filetoupload.name;

                mv(oldpath, newpath, function (err) {
                    if (err) throw err;
                    res.redirect('/main-Hall');

                });
            });

            break;

    }



});
module.exports = router;