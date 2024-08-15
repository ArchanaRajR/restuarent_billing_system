// const Waiter = require('../model/waiter');
// const Product = require('../model/product'); 
// const Table=require("../model/waiterTable")




// const waiterGet = (req, res) => {
//   try {
//     res.render('waiter/waiterLogin');
//   } catch (error) {
//     console.log(error);
//   }
// };

// const waiterRegister = async (req, res) => {
//   try {
//     res.render('waiter/waiterRegister');
//   } catch (error) {
//     console.log(error);
//   }
// };

// const waiterDash = (req, res) => {
//   try {
//     res.render("waiter/waiterDash");
//   } catch (error) {
//     console.log(error);
//   }
// };

// const waiterLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const check = await Waiter.findOne({ email });

//     if (check && check.password === password) {
//       res.redirect('/waiter/dash'); // Assuming /waiter/dash is the dashboard
//     } else {
//       res.send('Wrong username or password');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const existUser = await Waiter.findOne({ email });

//     if (existUser) {
//       res.send('User already exists');
//     } else {
//       const newWaiter = new Waiter({ name, email, password });
//       await newWaiter.save();
//       res.redirect('/waiter');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const wDash = async (req, res) => {
//   try {
//     const tableFind=await Table.find()
//     const search = req.query.search || '';
//     const users = await Waiter.find({
//       name: { $regex: search, $options: 'i' },
//     });
//     res.render('waiter/table', { users, search ,tableFind});
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const wPage = async (req, res) => {
//   try {
//     const search = req.query.search || '';
//     const users = await Waiter.find({
//       name: { $regex: search, $options: 'i' },
//     });
//     res.render('waiter/waiterDash', { users, search });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const waiterMenu = async (req, res) => {
//   try {
//     const products = await Product.find(); // Fetch products from database
//     res.render('waiter/menu', { products }); // Pass products to the view
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// module.exports = {
//   waiterGet,
//   waiterRegister,
//   waiterLogin,
//   signup,
//   wDash,
//   wPage,
//   waiterDash,
//   waiterMenu
// };
const Waiter = require('../model/waiter');
const Product = require('../model/product'); 
const Table=require("../model/waiterTable")




const waiterGet = (req, res) => {
  try {
    res.render('waiter/waiterLogin');
  } catch (error) {
    console.log(error);
  }
};

const waiterRegister = async (req, res) => {
  try {
    res.render('waiter/waiterRegister');
  } catch (error) {
    console.log(error);
  }
};

const waiterDash = (req, res) => {
  try {
    res.render("waiter/waiterDash");
  } catch (error) {
    console.log(error);
  }
};

const waiterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const check = await Waiter.findOne({ email });

    if (check && check.password === password) {
      res.redirect('/orders'); // Assuming /waiter/dash is the dashboard
    } else {
      res.send('Wrong username or password');
    }
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await Waiter.findOne({ email });

    if (existUser) {
      res.send('User already exists');
    } else {
      const newWaiter = new Waiter({ name, email, password });
      await newWaiter.save();
      res.redirect('/waiter');
    }
  } catch (error) {
    console.log(error);
  }
};

const wDash = async (req, res) => {
  try {
    const tableFind=await Table.find()
    const search = req.query.search || '';
    const users = await Waiter.find({
      name: { $regex: search, $options: 'i' },
    });
    res.render('waiter/table', { users, search ,tableFind});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
};

const wPage = async (req, res) => {
  try {
    const search = req.query.search || '';
    const users = await Waiter.find({
      name: { $regex: search, $options: 'i' },
    });
    res.render('waiter/waiterDash', { users, search });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
};

const waiterMenu = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // Fetch products from database
    res.render('waiter/menu', { products }); // Pass products to the view
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  waiterGet,
  waiterRegister,
  waiterLogin,
  signup,
  wDash,
  wPage,
  waiterDash,
  waiterMenu
};
