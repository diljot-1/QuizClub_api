const connection = require('../connect');
 const {Schema} = require('mongoose');
//const { config } = require('../../../testengine_view/src/utils/config');
 const RightSchema = new Schema({
     name:{type:Schema.Types.String, required:true, unique:false, min:3, max:25},
     url:{type:Schema.Types.String, required:false},
     status:{type:Schema.Types.String, default:'Y'},

 },{timestamps:true});
 const RightModel = connection.model('rights',RightSchema);
 module.exports = RightModel;