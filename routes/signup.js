

const router = require('express').Router();

router.get('/', (request, Response) => {
    Response.render('signup', {
        title: "Signup",
        css: "signup",
        js: "signup"

    }
    );
});

module.exports = router;