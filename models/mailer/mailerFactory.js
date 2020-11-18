const { createMailer } = require("./mailer")
require('dotenv').config()

const creds = { email: process.env.MAILER_MAIL, pwd: process.env.MAILER_PWD }
const mailer = createMailer(creds)

const mailerFactory = {
    getMailer: () => mailer
}

module.exports = { mailerFactory }