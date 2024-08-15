
// const express = require("express");
// const productController = require("../controller/productController");
// const upload = require("../controller/multer");
// const router = express.Router();

// router.get("/", productController.getAllProducts);
// router.get("/new", productController.renderProductForm);
// router.get("/productForm", productController.cProduct);

// router.post("/new", upload.upload.array("image"), productController.createProduct);
// router.get("/:id/edit", productController.edit); // GET route for rendering edit form
// router.post("/:id/update", upload.upload.array("image"), productController.updateProduct); // POST route for updating product
// router.post("/:id/delete", productController.deleteProduct);

// module.exports = router;



const express = require("express");
const productController = require("../controller/productController");
const upload = require("../controller/multer");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/new", productController.renderProductForm);
router.get("/productForm", productController.cProduct);

router.post("/new", upload.upload.array("image"), productController.createProduct);
router.get("/:id/edit", productController.edit); // GET route for rendering edit form
router.post("/:id/update", upload.upload.array("image"), productController.updateProduct); // POST route for updating product
router.post("/:id/delete", productController.deleteProduct);

module.exports = router;






