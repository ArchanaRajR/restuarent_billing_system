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

// const categorySchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   isBlocked: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Category = mongoose.model("Category", categorySchema);

// module.exports = Category;
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

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
