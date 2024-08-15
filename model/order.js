// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("connected db");
//   })
//   .catch(() => {
//     console.log("db not connected");
//   });

// const Schema = mongoose.Schema;
// const order = new Schema({
//   tableId: {
//     type: Schema.Types.ObjectId,
//     ref: "Waiter",
//     required: true,
//   },
//   orderedItems: [
//     {
//       dishId: {
//         type: Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       dishName: {
//         type: String,
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         min: 1,
//         max: 10,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       image: {
//         type: [String],
//         required: false,
//       },
//       status: {
//         type: String,
//         default: "Preparing",
//         enum: ["Preparing", "Packing", "Ready to serve", "Served"],
//       },
//       paymentStatus: {
//         type: String,
//         default: "Pending",
//         enum: ["Pending", "Processing", "Complated", "Failure", "Cancelled"],
//       },
//       paymentMethod: {
//         type: String,
//         required: true,
//         enum: ["By Cash", "By Card", "Gpay/upi"],
//       },
//       orderDate: {
//         type: Date,
//         default: Date.now,
//       },
//       totalAmount: {
//         type: Number,
//         required: true,
//       },
//       isReviewed: {
//         type: Boolean,
//         default: false,
//       },
//     },
//   ],
// });
// const orderSchema=mongoose.model('Order', order);
// module.exports = orderSchema

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected db");
  })
  .catch(() => {
    console.log("db not connected");
  });

const Schema = mongoose.Schema;
const order = new Schema({
  tableId: {
    type: Schema.Types.ObjectId,
    ref: "WaiterTable",
    required: true,
  },
  grandTotal:{
    type:Number,
    required:true
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderedItems: [
    {
      dishId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      orderDate: {
        type: Date,
        default: Date.now,
      },
      dishName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        min: 1,
        max: 10,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: [String],
        required: false,
      },
      status: {
        type: String,
        default: "Preparing",
        enum: ["Preparing", "Packing", "Ready to serve", "Served"],
      },
      paymentStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Processing", "Complated", "Failure", "Cancelled"],
      },
      paymentMethod: {
        type: String,
        required: true,
        enum: ["By Cash", "By Card", "Gpay/upi"],
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      isReviewed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});
const orderSchema=mongoose.model('Orders', order);
module.exports = orderSchema







