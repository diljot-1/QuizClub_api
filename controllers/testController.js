const testOperations = require('../services/testOperations');
const logger = require('../utils/logger')(__filename);
const {SUCCESS, SERVER_ERROR} =require('../utils/constants').HTTP_CODES;
const messageBundle = require('../locales/en.json');
const TestModel = require('../db/Schemas/TestSchema.js');
const UserModel = require('../db/Schemas/UserSchema.js');
const QuestionModel = require('../db/Schemas/QuestionSchema')
const testController={
    async addTest(req, res){
        
        const testObject =req.body;
        
        
        const testObjectcreate = await testOperations.createTest(testObject);
        console.log(testObjectcreate+'************');
        
           
            
            const UserTestMappingModel =require('../db/Schemas/UserTestMappingSchema')
            UserTestMappingModel.findOne({'userid':testObject.userid},(err, user_test_mapping_object)=>{
             if(err) console.log(err)
             else{
               console.log( user_test_mapping_object);
               const testArray=user_test_mapping_object.test_ids;
               console.log( testArray)
               testArray.push(testObjectcreate._id);
               console.log( testArray)
               UserTestMappingModel.updateOne({'_id':user_test_mapping_object._id},{$set:{'test_ids':testArray}},(err, result) =>{
                   if(err) {console.log(err)}
                   else {console.log(result)}
               })
               res.send({msg:'test created successfully', testId:testObjectcreate._id})
             }
            }) 
       
          
        

    },

    async getTestByName(req, res){

        const testName=req.params.name;
        const promise=await testOperations.findTestByName(testName);

        promise.then(docs=>{
            res.send(docs)
        }).catch(err=>{
            res.send(err);
        })
    },

    async getdetails(req, res){
        const userId=req.params.userId;
        const promise=await testOperations.getDetailsByUserId(userId)

        res.send(promise)
    },
    async assignTest(req, response){
        const email=req.body.email;
        const testId=req.body.testId;
        const UserTestMappingModel =require('../db/Schemas/UserTestMappingSchema')
        await UserModel.findOne({'mail': email},(err,res)=>{
            if(err) {console.log(err); response.send(err); }
            else{
                const userId=res._id;
                UserTestMappingModel.findOne({'userid': userId},(err,user_test_mapping_object)=>{
                    if(err) {console.log(err); response.send(err);}
                    else{
                        console.log( user_test_mapping_object);
                        const testArray=user_test_mapping_object.test_ids;
                        console.log( testArray)
                        testArray.push(testId);
                        console.log( testArray)
                        UserTestMappingModel.updateOne({'_id':user_test_mapping_object._id},{$set:{'test_ids':testArray}},(err, result) =>{
                            if(err) {console.log(err)}
                            else {console.log(result)}
                        })
                        response.send('test assigned successfully')
                      }
                })
            }
        })  
    },
    async getTestDetails(req, res){
        const testId=req.params.testId;
        await TestModel.findOne({'_id': testId},(err, result)=>{
            if(err) {console.log(err); res.send(err); }
            else{
                const QuestionIdArray=result.questionSet;
                const QuestionDetailsArray=[];

                async function getQuestions(){

                    for(var i=0;i<QuestionIdArray.length;i++){
                        var x= await  QuestionModel.findOne({'_id':QuestionIdArray[i]})
                        QuestionDetailsArray.push(x);
                        
                        console.log(QuestionDetailsArray[i]+" "+i)
                    }
                   
                   res.send(QuestionDetailsArray);
                  
                }

                getQuestions();
            }
        })
    }

    
}

module.exports =testController;