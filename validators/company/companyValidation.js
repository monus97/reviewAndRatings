// const { addReview } = require("../../controllers/companycontroller")
const CompanyValschema = require("./companyschema")
module.exports={
    registerCompanyValidation:async(req,res,next)=>{
        const value = await CompanyValschema.company.validate(req.body,{
            abortEarly:false
        })
        if (value.error){
            res.json({
                success:0,
                message:value.error.details[0].message
            })
        } else{
            next()
        }
    },
    addReview:async(req,res,next)=>{
        const value = await CompanyValschema.review.validate(req.body,{
            abortEarly:false
        })
        if (value.error){
            res.json({
                success:0,
                message:value.error.details[0].message
            })
        } else{
            next()}
            
        }
    }