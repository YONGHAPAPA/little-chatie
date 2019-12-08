var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user_controller');

router.get("/regist", user_controller.register)

module.exports = router;