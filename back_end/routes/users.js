var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user_controller');

router.post("/register", user_controller.register)


module.exports = router;