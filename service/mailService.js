var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"9792314940monu@gmail.com",
        pass:"tjdoepzepuegjcpi"
    }
});

// send out email through nodemailer

var mailOption = {
    from:"9792314940monu@gmail.com",
    // to:"arun.lal@graffersid.com",
    to:"",
    subject:"Hi i am monu singh. 5pm confermation mail",
    text:"hello this mail is testing mail "
}
module.exports = {
    transporter,
    mailOption
}