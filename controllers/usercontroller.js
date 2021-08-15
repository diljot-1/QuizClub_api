const userOperations= require('../services/useroperations')
const userController = {
    login (request, response){
        response.send('login Route');
    },
    register(request, response){
        response.send('Register Route');
    },
    async oauth(request, response){
       // console.log('BODY is ', request.body);
        const userObject= request.body;
     
        
        try{
          
            const userInfo = await userOperations.oAuth(userObject);
            if(userInfo){
                
                const token = require('../utils/token');
                let tokenId = token.createToken(userObject.mail);
                response.json({'userinfo':userInfo, 'tokenid':tokenId});
            }
            else{
                response.json({message:'Auth fail'});
            }
    
    
        }
        catch(err){
            response.json(err);
        }
        const roleInfo = await userOperations.getRoleId(userObject.role);
//        console.log('RoleInfo ',roleInfo);

        


    },

    async getMenus(request, response){
        const userMail=request.params.mail;
        const UserModel=require('../db/Schemas/UserSchema')
        const RoleModel=require('../db/Schemas/roleschema')
        
        const promise=new Promise(async(resolve, reject) =>{
         
           const docs= await UserModel.findOne({'mail':userMail})
       
           const roleObject=await RoleModel.findOne({'_id':docs.roleid});
           if(roleObject){
           

           const RightModel=require('../db/Schemas/rightschema')
           var rightDetailsArray=[];
           var obj={}
           async function getRights(){

            for(var i=0;i<roleObject.rights_id.length;i++){
                var x=await RightModel.findOne({'_id':roleObject.rights_id[i]})
                rightDetailsArray.push(x);
                
                console.log(rightDetailsArray[i]+" "+i)
            }
           
           resolve(rightDetailsArray);
          //  await roleObject.rights_id.map(async(right,index) =>{
             //  var x= await RightModel.findOne({'_id': right})
               //rightDetailsArray[index]=x;
               //console.log(rightDetailsArray[index]+" "+index);
        //   })
        }
           getRights()
           
          }
          else{
              reject('unable to load dashboard menu')
          }
        })

       promise.then(docs =>{response.send(docs)}).catch(err =>{response.send(err)})


    }

}
module.exports = userController;