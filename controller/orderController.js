// // controller/orderController.js

// const Order = require('../model/order');
// const mongoose = require('mongoose');
// const waitertable=require("../model/waiterTable")
// const Product=require("../model/product")

// // Create a new order
// exports.createOrder = async (req, res) => {
//     try {
//       // Validate tableId
//       let idTable= await waitertable.findOne({tableNumber:req.body.tableId})
//       let dish= await Product.findOne({dishName:req.body.dishName})
//       let total=dish.price*req.body.quantity
//       if (!mongoose.isValidObjectId(idTable._id)) {
//         return res.status(400).send('Invalid tableId');
//       }
  
//       const newOrder = {
//         tableId:idTable._id,
//         orderedItems:[{
//           dishId:dish._id,
//           dishName:req.body.dishName,
//           quantity:req.body.quantity,
//           price:dish.price,
//           paymentMethod:req.body.paymentMethod,
//           totalAmount:total
//         }]
//       }
//       await Order.insertMany(newOrder);
//       res.redirect('/orders');
//     } catch (error) {
//       res.status(500).send('Error creating order: ' + error.message);
//     }
//   };
//   // Function to validate if a string is a valid ObjectId
// function isValidObjectId(id) {
//     const mongoose = require('mongoose');
//     const ObjectId = mongoose.Types.ObjectId;
//     return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
//   }

// // Get all orders
// exports.getOrders = async (req, res) => {
//   try {
//     const table= await waitertable.find()
//     const dishes=await Product.find()
//     const orders = await Order.find().populate('tableId').populate('orderedItems.dishId');
//     res.render('waiter/order', { orders,table,dishes });
//   } catch (error) {
//     res.status(500).send('Error fetching orders: ' + error.message);
//   }
// };

// // Update order status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     await Order.updateOne({ _id: id, 'orderedItems._id': req.body.itemId }, { $set: { 'orderedItems.$.status': status } });
//     res.redirect('/orders');
//   } catch (error) {
//     res.status(500).send('Error updating order status: ' + error.message);
//   }
// };

// // Update payment status
// exports.updatePaymentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { paymentStatus } = req.body;
//     await Order.updateOne({ _id: id, 'orderedItems._id': req.body.itemId }, { $set: { 'orderedItems.$.paymentStatus': paymentStatus } });
//     res.redirect('/orders');
//   } catch (error) {
//     res.status(500).send('Error updating payment status: ' + error.message);
//   }
// };

// // Get orders specific to waiter
// exports.getWaiterOrders = async (req, res) => {
//   try {
//     // Implement your logic to fetch orders specific to waiters
//     // For example, filter orders based on waiter ID or other criteria
//     const orders = await Order.find({ /* Your filter criteria */ }).populate('tableId').populate('orderedItems.dishId');
//     res.render('waiter/order', { orders }); // Adjust the view name as per your setup
//   } catch (error) {
//     res.status(500).send('Error fetching waiter orders: ' + error.message);
//   }
// };

// controller/orderController.js

const Order = require('../model/order');
const waitertable=require("../model/waiterTable")
const Product=require("../model/product")


// Create a new order
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    let idTable = await waitertable.findOne({ tableNumber: req.body.tableId });
    if (!idTable) {
      return res.status(400).send('Invalid tableId');
    }

    let orderedItems = req.body.orderedItems.map(async item => {
      let dish = await Product.findOne({ dishName: item.dishName });
      if (!dish) {
        throw new Error(`Dish ${item.dishName} not found`);
      }
      return {
        dishId: dish._id,
        dishName: item.dishName,
        quantity: item.quantity,
        price: dish.price,
        paymentMethod: item.paymentMethod,
        totalAmount: dish.price * item.quantity
      };
    });

    orderedItems = await Promise.all(orderedItems);

    let grandTotal = orderedItems.reduce((acc, item) => acc + item.totalAmount, 0);

    const newOrder = {
      tableId: idTable._id,
      grandTotal: grandTotal,
      orderedItems: orderedItems
    };

    await Order.insertMany(newOrder);
    res.redirect('/orders');
  } catch (error) {
    res.status(500).send('Error creating order: ' + error.message);
  }
};

  // Function to validate if a string is a valid ObjectId
function isValidObjectId(id) {
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Types.ObjectId;
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
  }

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const table= await waitertable.find()
    const dishes=await Product.find()
    const orders = await Order.find().populate('tableId').populate('orderedItems.dishId').sort();
    res.render('waiter/order', { orders,table,dishes });
  } catch (error) {
    res.status(500).send('Error fetching orders: ' + error.message);
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Order.updateOne({ _id: id, 'orderedItems._id': req.body.itemId }, { $set: { 'orderedItems.$.status': status } });
    res.redirect('/orders');
  } catch (error) {
    res.status(500).send('Error updating order status: ' + error.message);
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    await Order.updateOne({ _id: id, 'orderedItems._id': req.body.itemId }, { $set: { 'orderedItems.$.paymentStatus': paymentStatus } });
    res.redirect('/orders');
  } catch (error) {
    res.status(500).send('Error updating payment status: ' + error.message);
  }
};

// Get orders specific to waiter
exports.getWaiterOrders = async (req, res) => {
  try {
    // Implement your logic to fetch orders specific to waiters
    // For example, filter orders based on waiter ID or other criteria
    const orders = await Order.find({ /* Your filter criteria */ }).populate('tableId').populate('orderedItems.dishId');
    res.render('waiter/order', { orders }); // Adjust the view name as per your setup
  } catch (error) {
    res.status(500).send('Error fetching waiter orders: ' + error.message);
  }
};

