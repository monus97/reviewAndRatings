const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
var bodyparser = require("body-parser")
var crudschema = require('./model/userschema');
const mongoose = require('mongoose')
require('./model/config')
const cron = require("node-cron");
const user = require('../reviewandratings/model/userschema');
const userschema = require('./model/userschema');

const app=express();
app.use(bodyparser.json());
app.use(express.json())

const router = require('./routes/commonroutes')
const testRouter = require('./validation')



// const sendMail=(req,res)=>{
    // console.log("hello")

cron.schedule('00 17 * * *',(req,res)=>{
    sendMail();
    console.log('hello this is text mail');
})
app.use('/',router);
app.use('/',testRouter)

  const server = app.listen(process.env.PORT,(req,res)=>{
    console.log(`running to the port no:${process.env.PORT}`);
})

module.exports = server;
















// }
// cron.schedule("*/4 * * * * *",(res,req)=>{
    // sendMail();
    // console.log("running a task in every 10 second");

// });

// app.post('/registeruser',async(req,res)=>{
//     const email=req.body.email
//     const userdata=new userschema({
//         name:req.body.name,
//         city:req.body.city,
//         email:req.body.email,
//         number:req.body.number,
//         state:req.body.state
//     })
//     console.log(req.body.name);
//     try{ const userExits=await user.findOne({email:req.body.email})
//     console.log( "error",userExits)
//     if(userExits){
//         return res.status(400).json({status:400,error:"email Already exits"});
//     } console.log('inside try');
//     const addRes=await userdata.save()
//     console.log('after try');
//     res.json(addRes)

//     }
//     catch(err){
//         res.send('error'+err)
//     }
// })
// app.get('/',(req,res)=>{
//     res.send('this is the get request')
// })

// app.get('/employeelist',async(req,res)=>{
//     try{
//         console.log('get request')
//         const crud=await crudschema.find();res.json(crud)
//     }
//     catch(err){
//         res.send('error'+err)
//     }
// })


