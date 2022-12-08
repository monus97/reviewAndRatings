const mongoose = require('mongoose');
const reviewschema = new mongoose.Schema({
  
    subject:{
        type:String,
        require:true
    },
    review:{
        type:String,
        require:true
    },
    ratings:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        require:true
    },
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user"},
    
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"company"
                   },

})
reviewschema.set("timestamps",true)
module.exports = mongoose.model('review',reviewschema)