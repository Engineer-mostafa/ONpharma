//framework
const express = require('express');

//manage path
const path = require('path');

//engine
const ejs = require('ejs');

//to convert response into json format and give us access the form data
const bodyParser = require('body-parser');

// use the framework
const app = express();



//include routes
const homeRoute = require('./routes/home');
const medicalhistoryRoute = require('./routes/medicalhistory');
const PharmacyRoute = require('./routes/pharmacist_view');
const mainHallForPatients = require('./routes/mainHallForPatient');
const session = require('express-session');

//local host
const port = process.env.PORT || 3000;

//default path to access the files in the server not locally
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//virtual engine that allow us to write code in html files(views) like for loops
app.set("view engine", 'ejs');

//to convert response into json format
app.use(bodyParser.json());

//session
app.use (session({
    secret :'keyboard cat',
    resave : false ,
    saveUninitialized :false ,
    cookie:{
        maxAge :60*1000*30
    }

}));

//to able neasting object in json format this required explicitly we should write this if we need to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

//routes of the pages
app.use('/home', homeRoute);
app.use('/medical-history', medicalhistoryRoute);
app.use('/pharmacist-v', PharmacyRoute);
app.use('/main-Hall', mainHallForPatients);



//server listen
app.listen(port, (error) => {
    if (error) return console.log(error);
    console.log(`listen at port ${port}`);

})





































