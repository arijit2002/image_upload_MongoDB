const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("db connection uri", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true,
    //useFindandModify:true
}).then(function(){
    console.log("connected successfully");
}).catch(function(err){
    console.log("error: " + err);
});
