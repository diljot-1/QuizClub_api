
 const UserModel = require('../db/Schemas/UserSchema');
 const RoleModel = require('../db/Schemas/roleschema');
const userOperations = {

   async getRoleId(currentRoleName){
     //  console.log('Current Role Name :::: ',currentRoleName);
       try{
        var roleInfo = await RoleModel.findOne({"name":currentRoleName});
       }
       catch(err){
        return err;
       }
       return roleInfo;
    },

    async oAuth(userObject){
      
    
        console.log('UserObject is ::::: ', userObject);
       
            const docs=await UserModel.create(userObject);
            
            user = await UserModel.findOne({'mail':userObject.mail })
            console.log('**************'+user)
            const RoleModel = require('../db/Schemas/roleschema')
            const roleinfo=await RoleModel.findOne({'role': userObject.role},(err, role) =>{
                if(err) console.log(err)
                else console.log(role)
            })
            console.log('************'+roleinfo)//correct
            
             
             await  UserModel.updateOne({'_id':user._id},{$set:{'roleid':roleinfo._id}}, {rawResult:true},(err, result)=>{
                if(err){console.log(err)}
                else{console.log(result)}
            })
           console.log('************'+user._id)
            const UserTestMappingModel =require('../db/Schemas/UserTestMappingSchema')
            const UserTestObject={
                'userid': user._id
            }
            const UserTestInfo=await UserTestMappingModel.create(UserTestObject,(err, result) =>{
                if(err) 
                 console.log('errrrooooooooooorr'+err)
            });
            console.log('%%%%%%%*******'+UserTestInfo);
              
            console.log(user)

            return user;
    
//    console.log(':::: User Info :::: ',user);

    }
}
module.exports = userOperations;