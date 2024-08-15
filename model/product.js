// const mongoose = require("mongoose");
// const Category=require("./category")


// mongoose
//   .connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("connected db"); 
//   })
//   .catch(() => {
//     console.log("db not connected");
//   });

// const Schema =  mongoose.Schema;

// const productSchema = new Schema({
//   dishName: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   category: { 
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
    
//   },
//   price:{
//     type:Number,
//     required:true
//   },
//   image:{
//     type:[String],
//     required:true
//   },
//   unList:{
//     type:Boolean,
//     required:true,
//     default:true
//   }
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;


const mongoose = require("mongoose");
const Category=require("./category")


mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected db"); 
  })
  .catch(() => {
    console.log("db not connected");
  });

const Schema =  mongoose.Schema;

const productSchema = new Schema({
  dishName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:[String],
    required:true
  },
  unList:{
    type:Boolean,
    required:true,
    default:true
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
