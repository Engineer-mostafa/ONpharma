

const router = require('express').Router();

router.get('/', (request, Response) => {
    Response.render('home',{
        title: "Home",
        css: "home",
        js : "home"

    }
    );
});


router.post('/', (request, Response) => {
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