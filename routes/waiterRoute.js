// const express = require('express');
// const router = express.Router();
// const waiterController = require('../controller/waiterController');
// const waiterCrud = require('../controller/waiterCrud');
// const tableController=require("../controller/tableController")

// // GET routes
// router.get('/', waiterController.waiterGet);
// router.get('/register', waiterController.waiterRegister);
// router.get('/dash', waiterController.wDash); 
// router.get('/waiterDash', waiterController.wPage); 
// router.get('/menu', waiterController.waiterMenu);


// router.get('/tableStatus/:id',tableController.isOccupied);

// router.get('/delete/:id', waiterCrud.del);
// router.get('/edit/:id', waiterCrud.edit);


// // POST routes
// router.post('/register', waiterController.signup);
// router.post('/login', waiterController.waiterLogin);
// router.post('/update/:id', waiterCrud.editUpdate);
// router.post('/login', waiterController.waiterLogin);






// module.exports = router; 
const express = require('express');
const router = express.Router();
const waiterController = require('../controller/waiterController');
const waiterCrud = require('../controller/waiterCrud');
const tableController=require("../controller/tableController")

// GET routes
router.get('/', waiterController.waiterGet);
router.get('/register', waiterController.waiterRegister);
router.get('/dash', waiterController.wDash); 
router.get('/waiterDash', waiterController.wPage); 
router.get('/menu', waiterController.waiterMenu);


router.get('/tableStatus/:id',tableController.isOccupied);

router.get('/delete/:id', waiterCrud.del);
router.get('/edit/:id', waiterCrud.edit);


// POST routes
router.post('/register', waiterController.signup);
router.post('/login', waiterController.waiterLogin);
router.post('/update/:id', waiterCrud.editUpdate);
router.post('/login', waiterController.waiterLogin);






module.exports = router; 


