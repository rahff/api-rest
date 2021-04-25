const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

/* GET users listing. */
router.get("/", userController.userList);

router.get("/:id", userController.getOneUser);

router.post("/signup", userController.signup);

router.post('/login', userController.login)

module.exports = router;
