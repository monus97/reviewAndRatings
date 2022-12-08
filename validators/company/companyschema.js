// const { object, string } = require('@hapi/joi')
const joi = require('@hapi/joi')
// var Joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const CompanyValschema = {
    company : joi.object({
    companyname : joi.string().max(70).required(),
    city : joi.string().required(),
    location : joi.string().required(),
    founded : joi.string().required(),
    userId : joi.objectId().required(),
   
    // companylogo:joi.string().required(),
    }).unknown(true),

review : joi.object({
    subject : joi.string().max(15).min(8).required(),
    review : joi.string().max(50).min(5).required(),
    ratings : joi.number().integer().max(5).min(1).required(),
    userId : joi.objectId().required(),
    companyId : joi.objectId().required(),
}).unknown(true)
   
}
module.exports = CompanyValschema