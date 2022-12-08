const mongoose = require('mongoose')
const crudschema =  new mongoose.Schema
({
    name :{
        type:String,
        require:true
    },
    sub:{
        type:String,
        require:true,
        default:false
    }
})
module.exports = mongoose.model('user',crudschema);