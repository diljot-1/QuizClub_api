const connection = require('../connect');
const {Schema} = require('mongoose');
//const { config } = require('../../../testengine_view/src/utils/config');
const RoleSchema = new Schema({
    role: {type:Schema.Types.String, required:true, unique:false, min:3, max:25},
    description:{type:Schema.Types.String, required:false,unique:false},
    status:{type:Schema.Types.String, default:'Y'},
    rights_id:[{type:Schema.Types.ObjectId, ref:'rights'}]  // (one to many) represent front end menu links


},{timestamps:true});
const RoleModel = connection.model('roles',RoleSchema);
module.exports = RoleModel;
