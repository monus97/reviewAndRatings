const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    name :{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    number:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
     profilepic:{
         type:String,
     },
    isActive:{
        type:Boolean,
        default:true
    }
})

userschema.set("timestamps",true)
module.exports = mongoose.model('user',userschema)