


const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const adminRoute = require("./routes/adminRoute");
const managerRoute = require("./routes/managerRoute");
const waiterRoute = require("./routes/waiterRoute");
const productRoute = require("./routes/productRoute");
// const waiterTable = require("./model/waiterTable");
const orderRoute=require("./routes/orderRoute")

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

// Ensure the public/images directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(path.join(__dirname, "public/images"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(orderRoute);

app.use("/", adminRoute);
app.use("/manager", managerRoute);
app.use("/waiter", waiterRoute);
app.use("/products", productRoute);




const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
