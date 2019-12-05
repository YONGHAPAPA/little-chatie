var express = require('express');
var router = express.Router();

router.get("/", (req, res)=>{
    console.log("route to users....");
    //res.send("OK");
    var data = {result:'OK'}
    res.send(data);

})

module.exports = router;