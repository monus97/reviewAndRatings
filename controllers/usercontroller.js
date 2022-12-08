const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../model/userschema')
const userschema = require("../model/userschema")
const { transporter, mailOption } = require('../service/mailService')

const sendmail = async (req, res) => {
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully' + info.response);
      res.send("successfully send mail")
    }
  })
}
const userSignup = async (req, res) => {
  const userdata = new userschema(req.body)
  try {
    const userExits = await User.findOne({ email: email })
    if (userExits) {
      return res.status(400).json({ status: 400, error: "Email already exit" })
    }
    const salt = await bcrypt.genSalt(10)
    userdata.password = await bcrypt.hash(password, salt)

    const filePath = `/upload/${req.file.filename}`;
    userdata.profilepic = filePath

    const addData = await userdata.save()
    res.json(addData)
  } catch (err) {
    res.send("Error" + err)
  }
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const User = await User.findOne({ email: email });
      if (User != null) {
        const isMatch = await bcrypt.compare(password, User.password)
        if (User.email === email && isMatch) {
          const token = jwt.sign({ userID: user._id },
            process.env.JWT_SECRET_KEY, { expiresIn: '9d' })
                         res.send({ status: "success", 
                         message: "login success",
                          "token": token });
        } else {
          res.send({
            status: "failed",
            message: "email or password is not valid",
          });
        }
      }
      else {
        res.send({ status: "failed", message: "you are not a register user" })
      }
    }
  } catch (err) {
    res.send("error" + err)
  }
}

const sendUserResetPasswordEmail = async (req, res) => {
    const { email } = req.body;
  if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_SECRET_KEY
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: '58min'
      })
      const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
      
      let info = await transporter.sendMail({
        from: "9792314940monu@gmail.com",
        to: user.email,
        subject: "password reset link",
        html: `<a herf=${link}> click here to reset password </a>`
      })
      res.send({ status: "success", info })
    }
    else {
      res.send({ status: "failed", message: "user not found" })
    }
  }
}

const userPasswordReset = async (req, res) => {
  const { password, confirm_password } = req.body
  console.log(password,confirm_password);
  const { id, token } = req.params
  const user = await User.findById(id)
  const new_secret = user._id + process.env.JWT_SECRET_KEY
  try {
    jwt.verify(token, new_secret)
    if (password && confirm_password) {
      if (password !== confirm_password) {
        res.send({
          status: "failed",
          message: "password and confirm password should be same "
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        var new_password = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user._id, {
          $set:
            { password: new_password }
        })
        res.send({
          status: " success",
          message: "password reset successfully"
        })
      }
    } else {
      res.send({ status: "failed", message: "all fields are required" })
    }
  }catch(error){

  }
}

module.exports = {
  userSignup, sendmail, userLogin, sendUserResetPasswordEmail,userPasswordReset
}