

const router = require('express').Router();

router.get('/', (request, Response) => {
    Response.render('login', {
        title: "Login",
        css: "login",
        js: "login"

    }
    );
});

module.exports = router;