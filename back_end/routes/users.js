var express = require('express');
var router = express.Router();

router.get("/", (req, res)=>{
    console.log("route to users....");
    res.send("OK");
})

module.exports = router;