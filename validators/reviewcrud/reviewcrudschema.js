const joi = require('@hapi/joi')

const crudValschema = {
    crud : joi.object({
    subject : joi.string().max(70).required(),
    review : joi.string().required(),
    ratings : joi.number().integer().required(),
    userId : joi.objectId().required(),
    companyId : joi.objectId().required(),
      }).unknown(true),
}

module.exports = crudValschema