
const router = require('express').Router();
const ASPC = require('../core/patient_ASPC');
var aspc = new ASPC();


router.get('/', (req, res) => {

    console.log("in Pharmacist v");

    if (typeof (req.session.user) == "undefined") {
        res.redirect('home');
    }
    else {
        res.render('pharmacistview', {
            title: "Pharmacy",
            css: "pharmacistview",
            js: "pharmacistview",
            img: "pharmacistv.png"

        }
        );
    }
});


router.post('/', (req, res) => {


    if (typeof (req.session.user) == "undefined") {
        res.redirect('home');
        return;
    }
    console.log(req.body.type);
    var id = req.session.user.acc_ID;
    console.log(req.body);
    try {
    

        switch (req.body.type) {
            case "pharmacistview":
                aspc.load_my_items(id, res.end);
                break;
            case "search":
                aspc.search_in_my_pharmacy(req.body.item_name, id, res.end);
                break;
            case "all_med":
                aspc.all_med_in_app(id, res.end);
                break;
            case "med_stock":
                aspc.all_med_in_mystock(id, res.end);
                break;
            case "additemtomystock":
                aspc.add_to_my_stock( id,req.body.name , req.body.Quantity ,res.end);

                break;
            case "edititemtomystock":
                aspc.edit_item__mystock(req.body.name, id, req.body.Quantity,res.end);
                break;
            case "destroy":
                  console.log("Destroy")
                req.session.destroy(function () {
                    res.redirect('home');
                    });
                
                break;

        }
    } catch (error) {
        console.log(error);
        
    }

});

module.exports = router;