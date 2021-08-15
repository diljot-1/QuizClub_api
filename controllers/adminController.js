const logger = require('../utils/logger')(__filename);
const {SUCCESS, SERVER_ERROR} =require('../utils/constants').HTTP_CODES;
const messageBundle = require('../locales/en.json');
const RoleModel = require('../db/Schemas/roleschema');
const UserModel = require('../db/Schemas/UserSchema.js');

const testController={
    async addTest(req, res){
        
        const roleObject =req.body;
        
        const promise = new Promise(async(resolve, reject) =>{
            await RoleModel.createRole(roleObject,(err, docs)=>{
                if(err) {reject(err)}
                else {resolve(dos)}
            })
        })
        promise.then()
        

    }
}