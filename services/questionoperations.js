const QuestionModel = require('../db/Schemas/QuestionSchema')

const Questionoperations={
  add(QuestionObjecct){
      
      const promise=QuestionModel.create(QuestionObjecct);
      return promise;
  }, 

  delete(){

  }, 
  
  update(){

  }, 

  search(){

  },

  findQuestionById(id){
     
       const promise=new Promise((resolve, reject) =>{
         QuestionModel.findById({'_id':id}, (err,docs)=>{
            
             if(err){
               reject(err);
             }
             else{
               resolve(docs);
             }
         })
       })
       return promise;
  },

  findByQuestionName(questionName){
    const regex = new RegExp(questionName, 'i');
    const promise = new Promise((resolve, reject)=>{
    QuestionModel.findOne({name: questionName},(err,doc)=>{
        if(err){
            reject(err);
        }
        else{
            resolve(doc);
        }
    });
});
return promise;
},

  readAll(){
     
       const promise =new Promise((resolve,reject) =>{
          QuestionModel.find({}, (err,docs) =>{
             if(err){
                reject(err);
             }
             else{
                resolve(docs);
             }
           })
         }
       )
        
      return promise; 
  }
}

module.exports =Questionoperations;