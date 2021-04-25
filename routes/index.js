const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const productRouter = require("./product.route");

/* GET home page. */
router.use("/users", usersRouter);

router.use("/products", productRouter);

module.exports = router;
