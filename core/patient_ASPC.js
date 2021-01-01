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
function get(){}














  // to insert new Analysis
//----------------------------------------------------------
// pool.query("INSERT INTO analysis (Analysis_Name, Analysis_Date, Result,Lower_Range,Upper_Range, Patient_acc_ID) VALUES('analysis200','2000-10-10',0,50,100,1) ", (error, rows) => {
//   if (error)
//     throw error;
//   else {
//         console.log("INSERTED SUCCEFULLY");
//     console.log(rows);
//   }

// });



  // to insert new Scan
// ----------------------------------------------------------------
// pool.query("INSERT INTO SCAN (Scan_Name, Scan_Date, Result, Patient_acc_ID) VALUES('SCAdNnn2','2000-10-10',0,1) ", (error, rows) => {
//   if (error)
//     throw error;
//   else {
//         console.log("INSERTED SUCCEFULLY");
//     console.log(rows);
//   }

// });

module.exports = get;