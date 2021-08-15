const questionOperations = require('../services/questionoperations');
const logger = require('../utils/logger')(__filename);
const Question=require('../dto/Question')
const {SUCCESS, SERVER_ERROR} =require('../utils/constants').HTTP_CODES;
const messageBundle = require('../locales/en.json')

const questionController = {
     addQuestion(request, response){
        logger.debug('Question added'+JSON.stringify(request.body));
        const questionObject = new Question(request.body.name, request.body.answers, request.body.author, request.body.type, request.body.testId);
        const promise = questionOperations.add(questionObject);
        promise.then(async data=>{
            const TestModel=require('../db/Schemas/TestSchema')
            await TestModel.findOne({'_id':questionObject.testId},(err, result)=>{
                const TestArray=result.questionSet
                TestArray.push(data._id);
                TestModel.updateOne({'_id':questionObject.testId},{$set:{'questionSet':TestArray}})
            })
            response.send(messageBundle['question.added']);
        }).catch(err=>{
            response.send(messageBundle['question.add.error']);
            logger.error('Error during addition of question'+JSON.stringify(err));
        })
     


    },
    getQuestionById(request, response){
        let id = request.query.id;
        logger.debug("Id for the question whose data is required"+JSON.stringify(id));
        const promise= questionOperations.findQuestionById(id);
        promise.then(docs => {
            response.status(SUCCESS).json(docs);
        }).
        catch(err => {
            response.status(SERVER_ERROR).json({'message':messageBundle['question.read.error']+JSON.stringify(err)});
            logger.error('Error while reading  question'+JSON.stringify(err));
        })
    }, 

    getQuestionByName(request, response){
        let name = request.params.name;
        logger.debug("Name for the question whose data is required"+JSON.stringify(name));
        const promise= questionOperations.findByQuestionName(name);
        promise.then(docs => {
            response.status(SUCCESS).json(docs);
        }).
        catch(err => {
            response.status(SERVER_ERROR).json({'message':messageBundle['question.read.error']+JSON.stringify(err)});
            logger.error('Error while reading  question'+JSON.stringify(err));
        })
        
    },

    getQuestions(request, response){
        const promise= questionOperations.readAll();
        promise.then(docs => {
            response.status(SUCCESS).json(docs);
        }).
        catch(err => {
            response.status(SERVER_ERROR).json({'message':messageBundle['question.readAll.error']+JSON.stringify(err)});
            logger.error('Error while reading all questions'+JSON.stringify(err));
        })
    }
}
module.exports = questionController;