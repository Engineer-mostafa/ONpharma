
const router = require('express').Router();
const pool = require('../core/Pool');
const { request } = require('express');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');
var nodemailer = require('nodemailer');
var QRCode = require('qrcode')



router.get('/', async (request, Response) => {
    console.log("in Main Hall Get");
   
    
    Response.render('mainHallForPatient', {
        title: "Main Hall",
        css: "mainHallForPatient",
        js: "mainHallForPatient",
        img: "checklist.png"

    }
    );
});



router.post('/', (req, res) => {

    console.log("in medical Post");
    var result;
    console.log(req.body.type);

    switch (req.body.type  /*data i get from ajax object*/) {
        case "search":
            pool.query(`SELECT * FROM SCAN s , account a WHERE a.acc_ID = s.Patient_acc_ID and a.acc_ID = ${req.body.phone}`, (error, rows) => {
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
            pool.query(`SELECT * FROM analysis s, account a WHERE a.acc_ID = s.Patient_acc_ID and a.acc_ID = ${req.body.phone}`, (error, rows) => {
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
            pool.query(`SELECT * FROM prescription p, account a WHERE a.acc_ID = p.Patient_acc_ID and a.acc_ID = ${req.body.phone}`, (error, rows) => {
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
            pool.query(`SELECT * FROM chronic_disease  c, account a WHERE a.acc_ID = c.Patient_acc_ID and a.acc_ID = ${req.body.phone}`, (error, rows) => {
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

        case "search_for_pharmacy":
            pool.query("SELECT pharmacy_name , pharmacy_address FROM pharmacy where pharmacy_name = '" + req.body.searchField + "'", (error, rows) => {
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

        case "search_for_Medicines":
            pool.query("SELECT pharmacy_name , pharmacy_address FROM pharmacy ph , pharmacy_repository pr ,pharmaceutical_item pi  where pr.pharmacy_ID = ph.pharmacy_ID and pi.item_id_barcode = pr.item_id and pi.item_name ='" + req.body.searchField + "'", (error, rows) => {
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

        case "barcode":
            // console.log("i will send");
            // console.log(req.body.barcode);
            // var transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'mostafamagdi999.mm@gmail.com',
            //         pass: 'Mosstafalover999'
            //     }
            // });
            // // <svg class='barcode' jsbarcode-format='upc' jsbarcode-value='123456789012' jsbarcode-textmargin='0' jsbarcode- fontoptions='bold' displayValue='false' > </svg >
            // var mailOptions = {
            //     from: 'mostafamagdi999.mm@gmail.com',
            //     to: 'mostafamagdy999.mm@gmail.com',
            //     subject: 'Sending Email using Node.js',
            //     attachDataUrls: true,//to accept base64 content in messsage
            //     html: 'wow <img class="barcode" src="' + req.body.barcode + '">' 
            // };

            // transporter.sendMail(mailOptions, function (error, info) {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log('Email sent: ' + info.response);
            //     }
            // });

            break;

        default:
            console.log("i Will Download File");
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var oldpath = files.filetoupload.path;
                //new path to save in our files
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