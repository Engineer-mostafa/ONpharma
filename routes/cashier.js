const router = require('express').Router();
const ASPC = require('../core/patient_ASPC');
const pool = require('../core/Pool');
const { request } = require('express');


router.get('/', (request, Response) => {

    console.log("in cashier get");


    Response.render('cashier', {
        title: "Cashier",
        css: "cashier",
        js: "cashier",
        img: ""
    }
    );
});
