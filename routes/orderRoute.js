// // routes/orderRoute.js

// const express = require('express');
// const router = express.Router();
// const orderController = require('../controller/orderController');

// // Route to create a new order
// router.post('/orders', orderController.createOrder);

// // Route to get all orders
// router.get('/orders', orderController.getOrders);

// // Route to update order status
// router.post('/orders/:id/updateStatus', orderController.updateOrderStatus);

// // Route to update payment status
// router.post('/orders/:id/updatePaymentStatus', orderController.updatePaymentStatus);

// // Route to get orders specific to waiter
// router.get('/waiter/orders', orderController.getWaiterOrders); // Adjust this route as per your controller

// module.exports = router;

// routes/orderRoute.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// Route to create a new order
router.post('/orders', orderController.createOrder);

// Route to get all orders
router.get('/orders', orderController.getOrders);

// Route to update order status
router.post('/orders/:id/updateStatus', orderController.updateOrderStatus);

// Route to update payment status
router.post('/orders/:id/updatePaymentStatus', orderController.updatePaymentStatus);

// Route to get orders specific to waiter
router.get('/waiter/orders', orderController.getWaiterOrders); // Adjust this route as per your controller

module.exports = router;

