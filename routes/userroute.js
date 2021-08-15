const express = require('express');
const route = express.Router();
const userController = require('../controllers/usercontroller');
route.post('/login',userController.login);
route.post('/register',userController.register);
route.post('/oauth',userController.oauth); ////authentication
route.get('/menus/:mail', userController.getMenus)

module.exports = route;