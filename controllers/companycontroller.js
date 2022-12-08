const { date } = require('@hapi/joi');
const res = require('express/lib/response');
const Id = require('objectid');
const companyschema = require('../model/companyschema');
const reviewschema = require('../model/reviewschema');
const { company } = require('../validators/company/companyschema');

const createCompany = async(req,res)=>{
    const companydata = new companyschema(req.body);
console.log(req.body.companyname);

try{
    let company = new ({...req.body});
    const filePath = `/upload/${req.file.filename}`;
    companydata.companylogo = filePath

    const addcompany = await companydata.save()
    res.json({
        status:0,
        message:"registered successfully.."
    })
    }catch (error){
    res.json({
        status : 0,
        message : error.message
    })
}
}
const CompanyList = async (req,res) => {
    try{
        const listdata = await companyschema.find()
        const count = await companyschema.count()
        res.send({
            status:0,
            "total company":count,listdata,
            CompanyList
        });
    }
        catch(error){
            res.send({
                status:400,
                message:"data not found"+err,
            })
        
    }
}
     const addReview = async(req,res)=>{
    const review = new reviewschema(req.body) 
    console.log('===>',review);
      try{
        //  let id = req.Params.key
         const Data = await review.save()
        res.json(Data)
        res.json({
            status:0,
            message:"review add successfully"
        })
    }catch(err){
        res.json("err"+err.message)
    }
}
const companyDetail = async(req,res)=>{
  try{ //  let id = req.Params.key
    console.log('api company id',Id)
    let company = await companyschema.find().lean()
    const comments = await reviewschema.find()
    // .populate({
    //     path:'userid',select:'name profilepic',})
    //     .populate({
    //         path:'companyid',select:'id'})

    //     console.log('**** Comments :',comments)
    //     var data = {
    //         'company':company,
    //         'comments':comments
    //     }
res.json({
    company,comments
})    
}catch(error){
    res.json({
        status:0,
        message:error.message
    })
}}

module.exports = {
    createCompany,
    CompanyList,
    addReview,
    companyDetail
}

