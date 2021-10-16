const mongoose = require('mongoose');

const dotenv=require('dotenv');
dotenv.config();
mongoose.connect( "",{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false}, (err)=>{
    if(err)
      console.log(err);
    else
      console.log("databse connected");
})

module.exports=mongoose;
