

const router = require('express').Router();

router.get('/', (request, Response) => {
    Response.render('medicalhistory', {
        title: "Medical History",
        css: "medicalhistory",
        js: "medicalhistory"

    }
    );
});

module.exports = router;