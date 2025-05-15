// Install node module 'nodemailer'
// 'npm i nodemailer'

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'madhavrathod019@gmail.com',
        pass: 'dfdl btmg wkje efxw'
    }
})

module.exports.sendOTP = (to, otp) => {
    let mailOptions = {
        from: 'madhavrathod019@gmail.com',
        to: to,
        subject: 'Password reset OTP',
        text: `Your password reset otp is ${otp}`
    }

    transport.sendMail(mailOptions, (error) => {
        error ? console.log(error) : console.log('OTP sended successfully')
    })
}