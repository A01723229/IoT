
const constants = require("./constants")
const express = require('express');
const sensorController = require('./RestControllers/sensorLog.js'); 
const router = express.Router();

router.get("/",function(req,res){
    res.send('<html><head><title>API IoT</title></head><body><h1>Hello Paolo!</h1></body></html>');
});

//Funcion post de insertLogTemperatura
router.post(constants.contextURL + constants.api + constants.postLog, sensorController.insertLog);

module.exports = router;