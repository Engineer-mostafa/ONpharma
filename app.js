//framework
const express = require('express');

//manage path
const path = require('path');

//engine
const ejs = require('ejs');

//to convert response into json format
const bodyParser = require('body-parser');

// use the framework
const app = express();

//include routes
const homeRoute = require('./routes/home');
const loginRoute = require('./routes/login');
const medicalhistoryRoute = require('./routes/medicalhistory');
const signupRoute = require('./routes/signup');
const stockRoute = require('./routes/stock');

//local host
const port = process.env.PORT || 6000;

//default path
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//virtual engine
app.set("view engine", 'ejs');

//to convert response into json format
app.use(bodyParser.json());
//to able neasting object in json format
app.use(bodyParser.urlencoded({extended: true}));

//routes of the pages
app.use('/home', homeRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/medicalhistory', medicalhistoryRoute);
app.use('/stock', stockRoute);



//server listen
app.listen(port/*port*/, (error) => {
    if (error) return console.log(error);
    console.log(`listen at port ${port}`);

})