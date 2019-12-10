var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user_controller');

router.post("/register", user_controller.register);
router.post("/login", user_controller.login);


module.exports = router;