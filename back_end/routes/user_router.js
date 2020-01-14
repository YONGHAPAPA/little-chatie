var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user_controller');

router.get("/checkSession", user_controller.checkSession);
router.get("/logout", user_controller.logout)
router.post("/register", user_controller.register);
router.post("/login", user_controller.login);

module.exports = router;