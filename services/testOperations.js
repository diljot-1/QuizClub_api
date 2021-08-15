const TestModel = require("../db/Schemas/TestSchema")
const  UserTestMappingModel=require("../db/Schemas/UserTestMappingSchema")
const testOperations={
    
    async createTest(testObject){
           
        const promise=new Promise( (resolve, reject) =>{
             TestModel.create(testObject,(err, result)=>{
                if(err){reject(err)}
                else{resolve(result);}
            })
            
        })
        return promise;
    },

    async findTestByName(name){
        const promise =await TestModel.findOne({'name':name})
        return promise;
    }, 

    async getDetailsByUserId(userId){
        const promise =new Promise(async(resolve,reject)=>{
            console.log(userId)
            await  UserTestMappingModel.findOne({'userid':userId},(err,result)=>{
                if(err) {reject(err); console.log(err)}
                else{
                    console.log(result);
                    const TestIdArray =result.test_ids;
                    console.log(TestIdArray)
                    var testDetailsArray = [];

                    async function getTests(){

                        for(var i=0;i<TestIdArray.length;i++){
                            var x= await  TestModel.findOne({'_id':TestIdArray[i]})
                            testDetailsArray.push(x);
                            
                            console.log(testDetailsArray[i]+" "+i)
                        }
                       
                       resolve(testDetailsArray);
                      
                    }
                   
                    getTests();
                    
                   
                        
                }
            }) 
        })
        return promise;
    }
}

module.exports=testOperations;