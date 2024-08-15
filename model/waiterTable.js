// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("connected db"); 
//   })
//   .catch(() => {
//     console.log("db not connected");
//   });

// const waiterTableSchema = new mongoose.Schema({
//     tableNumber: {
//         type: Number,
//         required: true
//     },
//     capacity: {
//         type: Number,
//         default: 4 
//     },
//     isOccupied: {
//         type: Boolean,
//         default: false 
//     }
// });

// const WaiterTable = mongoose.model('WaiterTable', waiterTableSchema);

// module.exports = WaiterTable;
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected db"); 
  })
  .catch(() => {
    console.log("db not connected");
  });

const waiterTableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        default: 4 
    },
    isOccupied: {
        type: Boolean,
        default: false 
    }
});

const WaiterTable = mongoose.model('WaiterTable', waiterTableSchema);

module.exports = WaiterTable;
