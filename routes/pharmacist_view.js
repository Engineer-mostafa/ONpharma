
const router = require('express').Router();
const pool = require('../core/Pool');
const { request } = require('express');


router.get('/', (req, res) => {
    res.render('pharmacistview', {
        title: "Pharmacy",
        css: "pharmacistview",
        js: "pharmacistview"

    }
    );
});


router.post('/', (req, res) => {


    switch (req.body.type) {
        case "pharmacistview":
            pool.query("SELECT item_name,item_price,item_id_barcode,item_quantity FROM pharmaceutical_item pi , pharmacy_repository pr , pharmacy p where p.pharmacy_ID = pr.pharmacy_ID and pi.item_id_barcode = pr.item_id ", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY items in pharmacy");

                    res.end(
                        result
                    );
                }
            });
            break;
        case "search":
            pool.query("SELECT item_name,item_price,item_id_barcode,item_quantity FROM pharmaceutical_item pi , pharmacy_repository pr , pharmacy p where p.pharmacy_ID = pr.pharmacy_ID and pi.item_id_barcode = pr.item_id and pi.item_name ='" + req.body.item_name + "'", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY items in pharmacy");

                    res.end(
                        result
                    );
                }
            });
            break;
        case "all_med":
            pool.query("SELECT item_name FROM pharmaceutical_item pp  where pp.item_name not in ( SELECT item_name FROM	pharmaceutical_item pi, pharmacy_repository pr, pharmacy p  where 	p.pharmacy_ID = pr.pharmacy_ID and pi.item_id_barcode = pr.item_id and p.pharmacy_ID = 1); ", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY all medicines");
                   
                    res.end(
                        result
                    );
                }
            });
            break;
        case "med_stock":
            pool.query("SELECT item_name,item_price,item_id_barcode,item_quantity FROM pharmaceutical_item pi , pharmacy_repository pr , pharmacy p where p.pharmacy_ID = pr.pharmacy_ID and pi.item_id_barcode = pr.item_id and p.pharmacy_ID = 1", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY all medicines");

                    res.end(
                        result
                    );
                }
            });
            break;
        case "additemtomystock":
            pool.query("INSERT INTO pharmacy_repository (`pharmacy_ID`, `item_id`, `item_quantity`) VALUES(1,(SELECT item_id_barcode from pharmaceutical_item where item_name = '" + req.body.name + "'),'" + req.body.Quantity+"'); ", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY all medicines");

                    res.end(
                        result
                    );
                }
            });
            break;
        case "edititemtomystock":
            pool.query("Update pharmacy_repository pr set item_quantity = '" + req.body.Quantity +"' where pr.item_id = (select item_id_barcode from pharmaceutical_item where  pharmaceutical_item.item_name =  '" + req.body.name + "');", (error, rows) => {
                if (error)
                    throw error;
                else {

                    result = JSON.stringify(rows);

                    console.log("FETCHED SUCCEFULLY all medicines");

                    res.end(
                        result
                    );
                }
            });
            break;
        

        
            edititemtomystock
        
        


    }


});

module.exports = router;