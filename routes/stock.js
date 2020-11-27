

const router = require('express').Router();

router.get('/', (request, Response) => {
    Response.render('stock', {
        title: "Stock",
        css: "stock",
        js: "stock"

    }
    );
});

module.exports = router;