const express=require('express');
const route=express.Router();

const questionController = require('../controllers/questionController');
route.post('/addquestion',questionController.addQuestion);
route.get('/getquestionbyid',questionController.getQuestionById);
route.get('/getquestionbyname/:name',questionController.getQuestionByName);
route.get('/getquestions',questionController.getQuestions);

module.exports =route;