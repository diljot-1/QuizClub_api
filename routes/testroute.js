const express=require('express');
const route=express.Router();

const testController = require('../controllers/testController');
route.post('/addtest',testController.addTest);
route.post('/assigntest',testController.assignTest);
route.get('/gettestbyname/:name',testController.getTestByName);
route.get('/getdetails/:userId',testController.getdetails);
//route.get('/deletetest', testController.deleteTest)
route.get('/gettest/:testId',testController.getTestDetails)
module.exports =route;