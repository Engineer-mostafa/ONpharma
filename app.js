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

//get mySQL


//include routes
const homeRoute = require('./routes/home');

const medicalhistoryRoute = require('./routes/medicalhistory');

const stockRoute = require('./routes/stock');
const mainHallForPatients = require('./routes/mainHallForPatient');

//local host
const port = process.env.PORT || 3000;

//default path to access the files in the server not locally
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//virtual engine that allow us to write code in html files(views) like for loops
app.set("view engine", 'ejs');

//to convert response into json format
app.use(bodyParser.json());
//to able neasting object in json format this required explicitly we should write this if we need to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

//routes of the pages
app.use('/home', homeRoute);
app.use('/medicalhistory', medicalhistoryRoute);
app.use('/stock', stockRoute);
app.use('/mainHallForPatient', mainHallForPatients);



//server listen
app.listen(port, (error) => {
    if (error) return console.log(error);
    console.log(`listen at port ${port}`);

})






































//note for me <form action = ""  method = "post">
//in forms action attribute i write on it the route i need this form to response in if i dont write any route by default the server will response in the same route