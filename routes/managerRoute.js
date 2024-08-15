// const express=require("express")
// const route=express.Router() 
// const managerController=require("../controller/managerController")
// const crudController=require("../controller/crud")


// //get 
// route.get("/",managerController.managerGet)
// route.get("/managerDash", managerController.dash);
// route.get("/managerFront",managerController.managerFront)

// // post
// route.post("/",managerController.managerPost)
// route.post("/update/:id",crudController.editUpdate)

// //create a params for delete
// route.get("/delete/:id",crudController.del)  
// route.get("/edit/:id",crudController.edit)



// module.exports=route

const express=require("express")
const route=express.Router() 
const managerController=require("../controller/managerController")
const crudController=require("../controller/crud")
const salesReport=require("../controller/salesreport")


//get 
route.get("/",managerController.managerGet)
route.get("/managerDash", managerController.dash);
route.get("/managerFront",salesReport.salesReportAdmin)

// post
route.post("/",managerController.managerPost)
route.post("/update/:id",crudController.editUpdate)

//create a params for delete
route.get("/delete/:id",crudController.del)  
route.get("/edit/:id",crudController.edit)



module.exports=route