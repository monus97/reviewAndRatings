const { date } = require('@hapi/joi');
const res = require('express/lib/response');
const Id = require('objectid');
const companyschema = require('../model/companyschema');
const reviewschema = require('../model/reviewschema');
const { company } = require('../validators/company/companyschema');

const createCompany = async (req, res) => {
    try {
        const companydata = new companyschema(req.body);
        const filePath = `/uploads/${req.file.filename}`;
        companydata.companylogo = filePath
        const addcompany = await companydata.save()
        res.status(200).json({
            status: "success",
            message: "registered successfully.."
        })
    } catch (error) {
        res.status(200).json({
            status: "failed",
            message: error.message
        })
    }
}
const CompanyList = async (req, res) => {
    try {
        const listData = await companyschema.find()
        const count = await companyschema.count()
        res.status(200).json({
            status: "success",
            message : listData
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        })

    }
}
const addReview = async (req, res) => {
try{    const review = new reviewschema(req.body)
        const Data = await review.save()
        res.status(200).json({
            status : "success",
            message : review
        })
    } catch (err) {
        res.status(400).json({
            status : "failed",
            message : err.message
        })
    }
}
const companyDetail = async (req, res) => {
    try {  let id = req.Params.id
        let company = await companyschema.findById(id)
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
        res.status(200).json({
            status : "success",
           message : company, comments
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

module.exports = {
    createCompany,
    CompanyList,
    addReview,
    companyDetail
}

