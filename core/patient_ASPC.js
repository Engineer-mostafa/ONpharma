const pool = require('./Pool');
const { request } = require('express');










// to insert new Analysis
// ----------------------------------------------------------
// function get() {
//   pool.query("SELECT * FROM SCAN ", (error, rows) => {
//   if (error)
//     throw error;
//   else {

//     let s = rows;

//     console.log("FETCHED SUCCEFULL55Y");
//     return rows;
//   }
// });
// }
function get() { };

get.prototype = {
  //

  //change statu of presctiption
  toggleStatus_Prescription: function (id, callback) {
    pool.query(`Update prescription set pres_status = 1 where Prescription_ID = ${id}`, (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
        callback(
          result
        );
      }
    });
  },



  //Fetch Chronic Disease
  getCoronicDisease: function (phone, callback) {
    pool.query(`SELECT * FROM chronic_disease  c, account a WHERE a.acc_ID = c.Patient_acc_ID and a.acc_ID = ${phone}`, (error, rows) => {
      if (error)
        throw error;
      else {
        result = JSON.stringify(rows);
        callback(
          result
        );
      }
    });
  },



  //Fetch Prescriptions
  getPrescriptions: function (phone, callback) {
    pool.query(`SELECT * FROM prescription p, account a WHERE a.acc_ID = p.Patient_acc_ID and a.acc_ID = ${phone}`, (error, rows) => {
      if (error)
        throw error;
      else {
        result = JSON.stringify(rows);
        callback(
          result
        );
      }
    });
  },


  //Fetch Scans
  getScan: function (phone, callback) {
    pool.query(`SELECT * FROM SCAN s , account a WHERE a.acc_ID = s.Patient_acc_ID and a.acc_ID = ${phone}`, (error, rows) => {
      if (error)
        throw error;
      else {
        result = JSON.stringify(rows);
        callback(
          result
        );
      }
    });
  },


  //Fetch Analysis
  getAnalysis: function (phone, callback) {
    pool.query(`SELECT * FROM analysis s, account a WHERE a.acc_ID = s.Patient_acc_ID and a.acc_ID = ${phone}`, (error, rows) => {
      if (error)
        throw error;
      else {
        result = JSON.stringify(rows);
        callback(
          result
        );
      }
    });
  },

  getMyPatient: function (myid = 1, callback) {
    pool.query("SELECT * FROM account where User_type = 'Patient';", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },


  search_for_pharmacy: function (searchField, callback) {
    pool.query("SELECT pharmacy_name , pharmacy_address FROM pharmacy where pharmacy_name = '" + searchField + "'", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },



  search_for_Medicines: function (searchField, callback) {
    pool.query("SELECT pharmacy_name , pharmacy_address FROM pharmacy ph , pharmacy_repository pr ,pharmaceutical_item pi  where pr.pharmacy_ID = ph.pharmacy_ID and pi.item_id_barcode = pr.item_id and pi.item_name ='" + searchField + "'", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
        callback(
          result
        );
      }
    });
  },


  all_med_in_app: function (myId, callback) {
    pool.query("SELECT item_name FROM pharmaceutical_item pp  where pp.item_name not in ( SELECT item_name FROM	pharmaceutical_item pi, pharmacy_repository pr, pharmacy p  where 	p.pharmacy_ID = pr.pharmacy_ID and pi.item_id_barcode = pr.item_id and p.pharmacy_ID = (SELECT pharmacy_ID FROM pharmacy p , account a  where a.acc_ID = p.pharmacy_manager_ID and a.acc_ID = '"+ myId+"')); ", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },


  all_med_in_mystock: function (myId, callback) {
    pool.query("SELECT item_name,item_price,item_id_barcode,item_quantity FROM pharmaceutical_item pi , pharmacy_repository pr , pharmacy p where p.pharmacy_ID = pr.pharmacy_ID and pi.item_id_barcode = pr.item_id and p.pharmacy_ID = (SELECT pharmacy_ID FROM pharmacy p , account a  where a.acc_ID = p.pharmacy_manager_ID and a.acc_ID = '" + myId +"')", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },


  specific_med_in_mystock: function (myId, item_name, callback) {
    pool.query("SELECT item_name,item_price,item_quantity FROM pharmaceutical_item pi , pharmacy_repository pr , pharmacy p where p.pharmacy_ID = pr.pharmacy_ID and pi.item_name='" + item_name + "' and pi.item_id_barcode = pr.item_id and p.pharmacy_ID = (SELECT pharmacy_ID FROM pharmacy p , account a  where a.acc_ID = p.pharmacy_manager_ID and a.acc_ID = '" + myId +"')", (error, rows) => {
      if (error)
        throw error;
      else {
        
        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },



  add_to_my_stock: function (myId, name, Quantity,callback) {
    pool.query("INSERT INTO pharmacy_repository (`pharmacy_ID`, `item_id`, `item_quantity`) VALUES((SELECT pharmacy_ID FROM pharmacy p , account a  where a.acc_ID = p.pharmacy_manager_ID and a.acc_ID = '" + myId +"'),(SELECT item_id_barcode from pharmaceutical_item where item_name = '" + name + "'),'" + Quantity + "'); ", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },


  load_my_items: function (myId,callback) {
    pool.query("SELECT * FROM pharmaceutical_item pi , pharmacy_repository pr , pharmacy p where p.pharmacy_ID = pr.pharmacy_ID and pi.item_id_barcode = pr.item_id and pr.pharmacy_ID = (SELECT pharmacy_ID FROM pharmacy p , account a  where a.acc_ID = p.pharmacy_manager_ID and a.acc_ID = '" + myId +"') ", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },



  search_in_my_pharmacy: function (item_name ,myId,callback) {
    pool.query("SELECT item_name,item_price,item_id_barcode,item_quantity FROM pharmaceutical_item pi , pharmacy_repository pr , pharmacy p where p.pharmacy_ID = pr.pharmacy_ID and p.pharmacy_ID= (SELECT pharmacy_ID FROM pharmacy p , account a  where a.acc_ID = p.pharmacy_manager_ID and a.acc_ID = '"+ myId+"') and pi.item_id_barcode = pr.item_id and pi.item_name ='" + item_name + "'", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },



  edit_item__mystock: function (item_name, myId, Quantity , callback) {
    pool.query("Update pharmacy_repository pr set item_quantity = '" + Quantity + "' where pr.item_id = (select item_id_barcode from pharmaceutical_item where pr.pharmacy_ID=(SELECT pharmacy_ID FROM pharmacy p , account a  where a.acc_ID = p.pharmacy_manager_ID and a.acc_ID = '" + myId +"') and pharmaceutical_item.item_name =  '" +  item_name + "');", (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },




  cash: function (myId, totalCash , callback) {
    pool.query(`INSERT INTO purchase_operation (pharmacy_ID,operation_cash) values((SELECT pharmacy_ID FROM pharmacy p , account a  where a.acc_ID = p.pharmacy_manager_ID and a.acc_ID = ${myId}),${totalCash});`, (error, rows) => {
      if (error)
        throw error;
      else {

        result = JSON.stringify(rows);
       callback(
          result
        );
      }
    });
  },


  
}













module.exports = get;