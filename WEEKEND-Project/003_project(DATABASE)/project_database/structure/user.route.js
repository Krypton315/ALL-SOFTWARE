const x = require("express");
const router = x.Router();
const userController = require("./user.controller.js");

router.get("/users", userController.getUsers);

module.exports = router;