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
const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});


const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
