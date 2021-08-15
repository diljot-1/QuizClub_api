
const AdminModel=require('../Schemas/adminSchema')

const adminOtpOperatons={
   
    getEmailAndUpdateOTP(mailP,otpP) { 
         
     const promise= new Promise((resolve, reject) =>{
         const promiseFind= new Promise((res, rej) =>{
              
             AdminModel.findOne({mail: mailP},(err, docs)=>{
                 if(err){
                     rej(err);
                     console.log(err)
                 }
                 else{
                     res(docs);
                     console.log(docs)
                 }
             })

         })

         promiseFind.then(docs =>{
            
            AdminModel.updateOne({mail: mailP},{otp: otpP},(errU, docsU)=>{
                if(errU){
                    reject(errU);
                    console.log('otp not added')
                }
                else{
                    resolve(docsU);
                    console.log('otp added successfully')
                }
            })

         }).catch(err =>{
             reject(err+"mail not found")
             console.log(err);
         })
     })

     return promise;
    },

     
     
     
     
     
     
     
     
     
     
        /*   const promise= new Promise((resolve, reject) =>{
            AdminModel.findOneAndUpdate({mail: mailP},{mail: mailP, otp: otpP},(err,docs) =>{
                if(err){
                    reject(err);
                    console.log(err);
                  }
                  else{
                    resolve(docs);
                    console.log(+docs);
                  }
            })
        })

        return promise;*/
    

    getDetailsAndVerify(mail){
          const promise=new Promise((resolve, reject)=>{
              AdminModel.findOne({mail: mail}, (err, docs)=>{
                if(err){
                    reject(err);
                    console.log(err);
                  }
                  else{
                    resolve(docs);
                    console.log(+docs);
                  }
              })
          })

          return promise;
    }

}

module.exports =adminOtpOperatons;