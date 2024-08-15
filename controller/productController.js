// const mongoose = require('mongoose');
// const Product = require("../model/product");
// const Category = require("../model/category");
// const multer = require("../controller/multer");


// // Render the form for creating or editing a product
// const renderProductForm = async (req, res, product = null) => {
//     const categories = await Category.find();
//     res.render("admin/update", { product, categories });
// };

// const cProduct = async (req, res, product = null) => {
//     const categories = await Category.find();
//     res.render("admin/productForm", { product, categories });
// };

// const createProduct = async (req, res) => {
//     try {
//         console.log(req.files); // Log files to debug
//         console.log(req.body);  // Log body to debug

//         if (!req.files || req.files.length === 0) {
//             return res.status(400).send('No files uploaded.');
//         }

//         let img = req.files.map((val) => {
//             return val.filename;
//         });

//         const productName = req.body.dishName.trim().toLowerCase(); // Convert product name to lowercase

//         const checkProductExists = await Product.findOne({
//             product_name: { $regex: new RegExp("^" + productName + "$", "i") } // Case-insensitive regex match
//         });

//         if (checkProductExists) {
//             console.log("Product already exists");
//             return res.status(400).send('Product already exists');
//         } else {
//             const cId=await Category.findOne({name:req.body.category}) 
            
//             const productData = {
//                 dishName: req.body.dishName,
//                 price: req.body.price,
//                 quantity: req.body.quantity,
//                 category:cId._id,
//                 image: img,

//             };

//             if (productData.quantity <= 0) {
//                 console.log("Product stock must be greater than 0");
//                 return res.status(400).send('Product stock must be greater than 0');
//             }

//             await Product.insertMany([productData]);
//             console.log("Product added successfully");
//             res.redirect('/products');
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error occurred");
//     }
// };



// const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.render("admin/productList", { products });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id).populate("category");
//         if (!product) {
//             return res.status(404).send("Product not found");
//         }
//         await renderProductForm(req, res, product);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// // productController.js

// const edit = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).send("Product not found");
//         }
//         await renderProductForm(req, res, product);
//     } catch (error) {
//         console.error('Error editing product:', error);
//         res.status(500).send("Error editing product");
//     }
// };

// const updateProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const { dishName, quantity, category, price } = req.body;

//         // Find product by ID
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).send('Product not found');
//         }

//         // Update product fields
//         product.dishName = dishName;
//         product.quantity = parseInt(quantity);
//         product.category = category; // Assuming category is already an ObjectId
//         product.price = parseFloat(price);

//         // Update image if new files are uploaded
//         if (req.files && req.files.length > 0) {
//             product.image = req.files.map(file => file.filename);
//         }

//         await product.save();
//         res.redirect('/products'); // Redirect to product list or another appropriate page
//     } catch (error) {
//         console.error('Error updating product:', error);
//         res.status(400).send(error.message);
//     }
// };

// const deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             return res.status(404).send("Product not found");
//         }
//         res.redirect("/products");
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// // Get list of products
// const getProductList = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.render("productList", { products });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error.message);
//     }
// };

// module.exports = {
//     createProduct,
//     getAllProducts,
//     getProductById,
//     updateProduct,
//     deleteProduct,
//     renderProductForm,
//     getProductList,
//     edit,
//     cProduct
    
// };

const mongoose = require('mongoose');
const Product = require("../model/product");
const Category = require("../model/category");
const multer = require("../controller/multer");


// Render the form for creating or editing a product
const renderProductForm = async (req, res, product = null) => {
    const categories = await Category.find();
    res.render("admin/update", { product, categories });
};

const cProduct = async (req, res, product = null) => {
    const categories = await Category.find();
    res.render("admin/productForm", { product, categories });
};

const createProduct = async (req, res) => {
    try {
        console.log(req.files); // Log files to debug
        console.log(req.body);  // Log body to debug

        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        let img = req.files.map((val) => {
            return val.filename;
        });

        const productName = req.body.dishName.trim().toLowerCase(); // Convert product name to lowercase

        const checkProductExists = await Product.findOne({
            product_name: { $regex: new RegExp("^" + productName + "$", "i") } // Case-insensitive regex match
        });

        if (checkProductExists) {
            console.log("Product already exists");
            return res.status(400).send('Product already exists');
        } else {
            const cId=await Category.findOne({name:req.body.category}) 
            
            const productData = {
                dishName: req.body.dishName,
                price: req.body.price,
                quantity: req.body.quantity,
                category:cId._id,
                image: img,

            };

            if (productData.quantity <= 0) {
                console.log("Product stock must be greater than 0");
                return res.status(400).send('Product stock must be greater than 0');
            }

            await Product.insertMany([productData]);
            console.log("Product added successfully");
            res.redirect('/products');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occurred");
    }
};



const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render("admin/productList", { products });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) {
            return res.status(404).send("Product not found");
        }
        await renderProductForm(req, res, product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// productController.js

const edit = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        await renderProductForm(req, res, product);
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).send("Error editing product");
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { dishName, quantity, category, price } = req.body;

        // Find product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Update product fields
        product.dishName = dishName;
        product.quantity = parseInt(quantity);
        product.category = category; // Assuming category is already an ObjectId
        product.price = parseFloat(price);

        // Update image if new files are uploaded
        if (req.files && req.files.length > 0) {
            product.image = req.files.map(file => file.filename);
        }

        await product.save();
        res.redirect('/products'); // Redirect to product list or another appropriate page
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).send(error.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.redirect("/products");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get list of products
const getProductList = async (req, res) => {
    try {
        const products = await Product.find();
        res.render("productList", { products });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    renderProductForm,
    getProductList,
    edit,
    cProduct
    
};

















