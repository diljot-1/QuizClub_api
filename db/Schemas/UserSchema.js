const connection=require("../connect");
const {Schema}=require("mongoose");

const UserSchema=new Schema({
    name:{type:Schema.Types.String, required:true,min:3, max:25},
    password:{type:Schema.Types.String, required:true, min:8, max:20},
    mail:{type:Schema.Types.String, required:true}, 
    roleid:{type:Schema.Types.ObjectId, ref:'roles'},
    
},{timestamps:true})

const UserModel =connection.model('users', UserSchema);
module.exports = UserModel;