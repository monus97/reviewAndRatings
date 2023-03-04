const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../model/userschema')
const userschema = require("../model/userschema")
const { transporter, mailOption } = require('../service/mailService')

const sendmail = async (req, res) => {
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
    } else {
      res.status(200).json({
        status: "success",
        message: info.response
      })
      res.status(400).json({
        message: "email not found"
      })
    }
  })
}

const userSignup = async (req, res) => {
  try {
    const userdata = new userschema(req.body)
    const userExits = await User.findOne({ email: req.body.email })
    if (userExits) {
      return res.status(400).json({
        status: "failed",
        message: "Email already exit"
      })
    }
    const salt = await bcrypt.genSalt(10)
    userdata.password = await bcrypt.hash(userdata.password, salt)
    // const filePath = `/uploads/${req.file.filename}`;
    // userdata.profilepic = filePath
    const addData = await userdata.save()
    res.status(200).json({
      status: "success",
      message: "new user register successfully"
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const userExits = await User.findOne({ email: email });
      if (userExits != null) {
        const isMatch = await bcrypt.compare(password, userExits.password)
        if (userExits.email === email && isMatch) {
          const token = jwt.sign({ userID: userExits._id },
            process.env.JWT_SECRET_KEY, { expiresIn: '9d' })
          res.status(200).json({
            status: "success",
            message: "login success",
           // "token": token
          });
        } else {
          res.status(400).json({
            status: "failed",
            message: "email or password is not valid",
          });
        }
      }
      else {
        res.status(403).json({
          status: "failed",
          message: "you are not a register user"
        })
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const sendUserResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_SECRET_KEY
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: '10days'
      })
      const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`

      let info = await transporter.sendMail({
        from: "9792314940monu@gmail.com",
        to: user.email,
        subject: "password reset link",
        html: `<a herf=${link}> click here to reset password </a>`
      })
      res.status(200).json({
        status: "success",
        message: "reset password send mail successfull",
        token: token
      })
    }
    else {
      res.status(400).json({
        status: "failed",
        message: "user not found"
      })
    }
  }
}

const userPasswordReset = async (req, res) => {
  const { password, confirm_password } = req.body
  const { id, token } = req.params
  try {
    const user = await User.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    jwt.verify(token, new_secret)
    if (password && confirm_password) {
      if (password !== confirm_password) {
        res.status(403).json({
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
        res.status(200).json({
          status: " success",
          message: "password reset successfully"
        })
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "all fields are required"
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

module.exports = {
  userSignup, sendmail, userLogin, sendUserResetPasswordEmail, userPasswordReset
}