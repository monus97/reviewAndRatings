const express = require('express');
const { ccontroller } = require('../controllers/companycontroller');
const { schema } = require('../model/companyschema');
const router = express.Router
const reviewschema = require('../model/reviewschema');
const { review } = require('../validators/company/companyschema');

const addReview11 = async(req,res)=>{
    console.log("====>",req.body)
    const controller = new reviewschema(req.body);
try{const schema = await controller.save()
    res.json({ status:200,
         message : "Add successfully.."
    })
    }catch (error){
    res.json({
        status : "failed",
        message : error.message
    })
}
},
 updateReview = async(req,res)=>{
    console.log(req.body)
    const reviewid = req.params.id;
    try{const updateReview =await reviewschema.findByIdAndUpdate(reviewid,req.body,{new:review})
         res.json({
            updateReview
         })
    }catch(error){
        res.json({
            status:200,
            message:"error",err
        })
    }
},
 deleteReview = async (req,res)=>{
    await reviewschema.findByIdAndDelete(req.params.id);
    res.send("delete review successfullty");
    try {
        res.status(200).send().json({
            status:"success",
            data :{},
        });
    }catch(err){
        res.status(500).json({
            status : "failed",
            message : err,
        })
    }
 } 

  const retriveReview = async(req,res)=>{
    const reviewId = req.params.id;
    try{
        getRetrive = await reviewschema.find({
            _id:`${reviewId}`
        },
        { subject : 1, ratings :1,review : 1, _id :0}
        );
        res.send ({
            status : 0,
            getRetrive: "retrive successfull",
        });
    }catch(err){
        res.send("error"+err)
    }
 }






module.exports = {addReview11,updateReview,deleteReview,retriveReview}
