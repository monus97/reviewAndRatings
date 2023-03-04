const joi = require('@hapi/joi')

const schema = {
    registeruser : joi.object({
    name : joi.string().required(),
    email : joi.string().required(),
    password : joi.string().required(),
    number : joi.number().integer().min(1000000000).max(9999999999)
    .message("invalid mobile number").required(),
    city : joi.string().required(),
    state : joi.string().required(),
    // profilepic : joi.string().required(),
    }).unknown(true),


    userLogin : joi.object({
        email : joi.string().email().required(),
        password : joi.string().required(),
    }).unknown(true)
}
module.exports = schema