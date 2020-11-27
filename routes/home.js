

const router = require('express').Router();

router.get('/', (request, Response) => {
    Response.render('home',{
        title: "Home",
        css: "home",
        js : "home"

    }
    );
});

module.exports = router;