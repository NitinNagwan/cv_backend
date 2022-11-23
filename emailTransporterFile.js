const nodemailer = require('nodemailer');


  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'fullst-world@outlook.com',
        pass: 'Vi@no@ve@123'
    },
    tls: {
  
        rejectUnauthorized: false
    }
    
});
  module.exports = transporter;

