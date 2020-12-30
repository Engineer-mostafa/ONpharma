

const router = require('express').Router();

router.get('/', (request, Response) => {


    //we will get all tables here of scans , analysis , prescreptions and chronic deasises 




    Response.render('medicalhistory', {
        title: "Medical History",
        css: "medicalhistory",
        js: "medicalhistory"

    }
    );
});

module.exports = router;