// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("connected db"); 
//   })
//   .catch(() => {
//     console.log("db not connected");
//   });

// const Schema=mongoose.Schema;
// const waiterSchema=new Schema({
  
//     name: {
//         type: String,
//         required: true,
//       },
//       email: {
//         type: String,
//         required: true,
//       },
//       password: {
//         type: String,
//         required: true,
//       }
     
//     });

//     const Waiter=mongoose.model("Waiter",waiterSchema)
//     module.exports=Waiter;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected db"); 
  })
  .catch(() => {
    console.log("db not connected");
  });

const Schema=mongoose.Schema;
const waiterSchema=new Schema({
  
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
     
    });

    const Waiter=mongoose.model("Waiter",waiterSchema)
    module.exports=Waiter;