

const router = require('express').Router();

router.get('/', (request, Response) => {
    Response.render('medicalhistory', {
        title: "Medical History",
        css: "medical-history",
        js: "medical-history"

    }
    );
});

module.exports = router;