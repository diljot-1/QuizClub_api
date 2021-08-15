const connection=require("../connect");
const {Schema}=require("mongoose");

const TestSchema=new Schema({

    name:{type:Schema.Types.String, required:true, max:100},
    questionSet:[{
        type:Schema.Types.ObjectId, 
        ref:"questions"
    }],
    
    description:{
        relevantSubjects:{type:Schema.Types.Array, required:false},
        issuedOn:{type:Schema.Types.Date, required:false},
        deadline:{type:Schema.Types.Date, required:false},
        maxScore:{type:Schema.Types.Number, required:false},
    }
},{timestamps:true})

const TestModel =connection.model('tests', TestSchema);
module.exports = TestModel;
