const connection = require('../connect');
 const {Schema} = require('mongoose');
 const QuestionSchema = new Schema({
     name:{type:Schema.Types.String, required:true, unique:true, min:10, max:200, /*index: true,sparse:true*/},
     answers:{type:Schema.Types.Array},
     questionbank:{type:Schema.Types.String, default:'Y'},
     //author:{type:Schema.Types.ObjectId, ref:'users'} // Join
     rans:{type:Schema.Types.String,required:true}
 
 
 },{timestamps:true});
 const QuestionModel = connection.model('questions',QuestionSchema);
 module.exports = QuestionModel;