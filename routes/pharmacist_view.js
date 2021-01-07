
const router = require('express').Router();
const pool = require('../core/Pool');
const { request } = require('express');
const ASPC = require('../core/patient_ASPC');
var aspc = new ASPC();


router.get('/', (req, res) => {
    res.render('pharmacistview', {
        title: "Pharmacy",
        css: "pharmacistview",
        js: "pharmacistview",
        img: "pharmacistv.png"

    }
    );
});


router.post('/', (req, res) => {

    try {
    

        switch (req.body.type) {
            case "pharmacistview":
                aspc.load_my_items(1, res.end);
                break;
            case "search":
                aspc.search_in_my_pharmacy(req.body.item_name, 1, res.end);
                break;
            case "all_med":
                aspc.all_med_in_app(1, res.end);
                break;
            case "med_stock":
                aspc.all_med_in_mystock(1, res.end);
                break;
            case "additemtomystock":
                aspc.add_to_my_stock(req.body.name , req.body.Quantity ,res.end);

                break;
            case "edititemtomystock":
                aspc.edit_item__mystock(req.body.name, 1, req.body.Quantity,res.end);
                break;

        }
    } catch (error) {
        console.log(error);
        
    }

});

module.exports = router;