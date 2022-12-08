const express = require('express')
const router = express.Router();
const crud = require('../controller/crudcontroller');
const validation = require('../validators/reviewcrud/reviewcrudvalidation')

router.post('/create',
validation.reviewcrudValidation,
crud.addReview11);

router.patch('/update/:id',crud.updateReview);
router.delete('/delete/:id',crud.deleteReview)
router.get('/retrive/:id',crud.retriveReview)

module.exports = router
