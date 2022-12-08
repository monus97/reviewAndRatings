const mongoose = require('mongoose')
mongoose.connect(process.env.url,{ useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open',(req,res)=>{
    console.log("mongo db connection data establish successfully")
})