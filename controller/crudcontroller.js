const express = require('express');
const { ccontroller } = require('../controllers/companycontroller');
const { schema } = require('../model/companyschema');
const router = express.Router
const reviewschema = require('../model/reviewschema');
const { review } = require('../validators/company/companyschema');

const addReview11 = async (req, res) => {
    try {
        const controller = new reviewschema(req.body);
        const schema = await controller.save()
        res.status(200).json({
            status: "success",
            message: "Add successfully.."
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
},
    updateReview = async (req, res) => {
        const reviewid = req.params.id;
        try {
            const updateReview = await reviewschema.findByIdAndUpdate(reviewid, req.body, { new: review })
            res.status(200).json({
                status: "success",
                message: updateReview
            })
        } catch (error) {
            res.status(200).json({
                status: "failed",
                message: error.message
            })
        }
    },
    deleteReview = async (req, res) => {

        try {
            await reviewschema.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status: "success",
                message: "review deleted successfull",
            });
        } catch (err) {
            res.status(500).json({
                status: "failed",
                message: err.message,
            })
        }
    }

const retriveReview = async (req, res) => {
    const reviewId = req.params.id;
    try {
        getRetrive = await reviewschema.find({
            _id: `${reviewId}`
        },
            { subject: 1, ratings: 1, review: 1, _id: 0 }
        );
        res.status(200).json({
            status: "success",
            getRetrive: "retrive successfull",
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}


module.exports = { addReview11, updateReview, deleteReview, retriveReview }
