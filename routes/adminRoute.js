// const express = require("express");
// const route = express.Router();
// const adminController = require("../controller/adminController");
// const catController=require("../controller/catController")

// // Get routes
// route.get("/",adminController.admin);
// route.get("/signup",adminController.register);
// route.get("/adminFront",adminController.adminFront);
// route.get("/category",catController.getCat);


// // Post routes
// route.post("/signup",adminController.signup);
// route.post("/adminFront",adminController.adminPost); 
// route.post("/addCategory",catController.postCat);

// module.exports = route;


const express = require("express");
const route = express.Router();
const adminController = require("../controller/adminController");
const catController=require("../controller/catController")
const invoice=require("../controller/invoice")
const salesreport=require("../controller/salesreport")


// Get routes
route.get("/",adminController.admin);
route.get("/signup",adminController.register);
route.get("/category",catController.getCat);



// Post routes
route.post("/signup",adminController.signup);
route.post("/adminFront",adminController.adminPost); 
route.post("/addCategory",catController.postCat);

// invoice
route.get("/invoice",invoice.invoice)
route.get("/generate-invoice/:orderId/pdf",invoice.invoicepdf)

// sales reportinte 
route.get('/sales-report',salesreport.salesReporter)
route.get('/sales-report/pdf',salesreport.salesPdf )


module.exports = route;








