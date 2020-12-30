

const router = require('express').Router();
const { body, validationResult } = require('express-validator');

router.get('/', (request, Response) => {
    Response.render('home',{
        title: "Home",
        css: "home",
        js : "home"

    }
    );
});


router.post('/', (request, Response) => {
    //try to use express-validator for validation the data
    //try to use express-messeges to return messege in error
    //try to use express-session to return user to reconnect


    //type of the registiration tou will find 4 forms in views/home.ejs that represent all these types
    switch (request.body.type) {
        case "Patient":
            console.log("Patient");
            break;
        case "Doctor":
            console.log("Doctor");
            break;

        case "Pharmacist":
            console.log("Pharmacist");
            break;

        default:
            console.log("login");
            break;
    }
    
    Response.render('home',{
        title: "Home",
        css: "home",
        js : "home"

    }
    );
});

module.exports = router;