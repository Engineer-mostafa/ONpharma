const router = require('express').Router();
const ASPC = require('../core/patient_ASPC');
var aspc = new ASPC();

router.get('/', (request, Response) => {

    console.log("in cashier get");
    if (typeof (request.session.user) == "undefined") {
        Response.redirect('home');
    }
    else {
        Response.render('cashier', {
            title: "Cashier",
            css: "cashier",
            js: "cashier",
            img: "money-bag.png"
        }
        );
    }
});




router.post('/', (req, res) => {

    console.log("in cash Post");
   console.log(req.body);

    switch (req.body.type  /*data i get from ajax object*/) {
        case "Prescriptions":
            aspc.getPrescriptions(req.body.phone, res.end);
            break;
        case "chronicDisease":
            aspc.getCoronicDisease(req.body.phone, res.end);
            break;
        case "toggle":
           aspc.toggleStatus_Prescription(req.body.id,res.end)
            break;
        case "getItem":
           aspc.specific_med_in_mystock(1,req.body.name,res.end)
            break;
        case "updateQuantity":
            aspc.edit_item__mystock(req.body.name,1, req.body.quantity,res.end)
            break;
        case "cash":
            aspc.cash(1,req.body.total,res.end)
            break;
    }
    });
module.exports = router;