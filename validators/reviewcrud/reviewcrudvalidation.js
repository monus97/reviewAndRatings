const createcrud = require("./reviewcrudschema")

module.exports = {
    reviewcrudValidation:async(req,res,next)=>{
        console.log(req.body)
        const value = await createcrud.crud.validate(req.body,{
            abortEarly:false
        })
        if (value.error){
            res.json({
                success:200,
                message:value.error.details[0].message
            })
        } else{
            next()
        }
    },

}