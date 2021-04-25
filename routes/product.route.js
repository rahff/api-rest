const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");
const multerConfig = require("../middlewares/multer.config");
const auth = require('../middlewares/auth');




router.get("/", auth, productController.list);

router.get("/:id", auth,  productController.show);

router.post("/", multerConfig,auth,  productController.create);

router.put("/:id", multerConfig, auth, productController.update);

router.delete("/:id", auth, productController.delete);

module.exports = router;
