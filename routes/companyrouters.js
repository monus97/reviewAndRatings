const express = require('express')
const router = express.Router();
const company = require('../controllers/companycontroller');
const {upload} = require("../middlewares/imageStorage");
const companyValidation = require('../validators/company/companyValidation')


router.post('/create',upload.single("companylogo"),
companyValidation.registerCompanyValidation, company.createCompany);
router.post('/review',companyValidation.addReview,company.addReview);

// router.use('/create',companyValidation)
router.get('/list',company.CompanyList)
router.get('/reviews',company.companyDetail)

module.exports =  router