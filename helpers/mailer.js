const nodemailer = require('nodemailer')

const sendMail = async (mailOptions, mailConnOptions) => {
  const connOptions = mailConnOptions
    ? mailConnOptions
    : {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
          user: process.env.MAIL_LOGIN,
          pass: process.env.MAIL_PASSWORD
        }
      }

  if (!mailOptions.subject) {
    throw new Error('Mail subject not defined')
  }

  if (!mailOptions.to || mailOptions.to.length === 0) {
    throw new Error('Mail to not defined')
  }

  if (!mailOptions.from) {
    mailOptions.from = process.env.MAIL_LOGIN
  }

  const mailInstance = nodemailer.createTransport(connOptions)

  await mailInstance.sendMail(mailOptions)
}

module.exports = sendMail
