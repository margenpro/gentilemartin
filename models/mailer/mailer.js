const nodemailer = require('nodemailer');
const createMailer = ({ email, pwd }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: pwd
    }
  });

  return {
    send: ({ receivers, subject, text }) => {
       
      const eConfig = prepare(email, receivers, subject, text)
        console.log(pwd, email)
        sendMail(eConfig, transporter)
    },
    
    sendAttachment: ({ receivers, subject, text, attName , attPath }) => {
       
      const eConfig = prepare(email, receivers, subject, text)
      eConfig.attachments = [{
        filename: attName,
        path: attPath
      }]

        sendMail(eConfig, transporter)
    }

  }
}

const sendMail = (config, transporter) => {
  transporter.sendMail(config, function(error, info){
    if (error) {
      throw new Error("Hubo un problema con el envio del mail: " + error)
    }
  });
}

const prepare = (email, receivers, subject, text) => {
    return {
        from: email, 
        receivers: "",
        bcc: receivers.toString(),
        subject,
        text
    }
}

module.exports = { createMailer }