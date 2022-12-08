const express = require('express')
const router = express.Router();
const userRouter = require('./userroutes')
const companyRouter = require('./companyrouters')
const crudrouter = require('./reviewcrudroutes')


router.use('/user',userRouter)
router.use('/company',companyRouter)
router.use('/reviewcrud',crudrouter)

module.exports = router