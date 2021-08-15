const connection=require("../connect");
const {Schema}=require("mongoose");

const AdminSchema=new Schema({
    mail:{type:Schema.Types.String, required:true, max:30},
    otp:{type:Schema.Types.String, required:true, max:15}
    
},{timestamps:true})
const AdminModel =connection.model('admin', AdminSchema);
module.exports = AdminModel;
