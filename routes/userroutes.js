const express = require('express')
const router = express.Router()
const user = require('../controllers/usercontroller')
const validation = require("../validators/users/user_Validation")
const {upload} = require('../middlewares/imageStorage')


router.post('/login',validation.userLoginValidation,user.userLogin)
router.post('/register', upload.single("profilepic"),
validation.registerUserValidation,user.userSignup)
router.post("/send-reset-password-email",user.sendUserResetPasswordEmail)
router.post("/reset-password/:id/:token",user.userPasswordReset)
router.get('/sendMail',user.sendmail)
//router.post('/Login',user.userLogin)

module.exports = router

