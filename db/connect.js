const mongoose = require('mongoose');

const dotenv=require('dotenv');
dotenv.config();
mongoose.connect( "mongodb+srv://diljot_1:dj123987@cluster0.brfki.mongodb.net/testenginedb?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false}, (err)=>{
    if(err)
      console.log(err);
    else
      console.log("databse connected");
})

module.exports=mongoose;