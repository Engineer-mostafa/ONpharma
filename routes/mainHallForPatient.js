

const router = require('express').Router();

router.get('/', (request, Response) => {
    Response.render('mainHallForPatient', {
        title: "Main Hall",
        css: "mainHallForPatient",
        js: "mainHallForPatient"

    }
    );
});


router.post('/', (request, Response) => {
    Response.render('mainHallForPatient', {
        title: "Main Hall",
        css: "mainHallForPatient",
        js: "mainHallForPatient"

    }
    );
});

module.exports = router;