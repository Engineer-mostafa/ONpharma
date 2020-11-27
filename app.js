const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const homeRoute = require('./routes/home');
const loginRoute = require('./routes/login');
const medicalhistoryRoute = require('./routes/medicalhistory');
const signupRoute = require('./routes/signup');
const stockRoute = require('./routes/stock');
const port = process.env.PORT || 7000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');

app.use('/home', homeRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/medicalhistory', medicalhistoryRoute);
app.use('/stock', stockRoute);

app.listen(port/*port*/, (error) => {
    if (error) return console.log(error);
    console.log(`listen at port ${port}`);

})