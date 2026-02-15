const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const permission = require("../middlewares/permission.middleware");
const controller = require("../controllers/user.controller");

router.get(
  "/profile",
  auth,
  permission("READ_PROFILE"),
  controller.profile
);

module.exports = router;
