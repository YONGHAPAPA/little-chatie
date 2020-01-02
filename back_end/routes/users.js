var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user_controller');

router.get("/login/checkSession", user_controller.checkSession);
router.get("/logout", user_controller.logout)
router.post("/register", user_controller.register);
router.post("/login", user_controller.login);

router.post("/foo", user_controller.foo);
router.post("/bar", user_controller.bar);

module.exports = router;