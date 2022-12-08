const mongoose = require('mongoose');
const companyschema = new mongoose.Schema({
    
    companyname:{
        type:String,
        require:true

    },
    city:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    founded:{
        type:String,
        require:true
    },
    companylogo :{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    }
})
companyschema.set("timestamps",true)
module.exports = mongoose.model('company',companyschema)