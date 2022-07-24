const mail = require('nodemailer');
const fs = require('fs');
const path = require("path");

const sender = mail.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_USE_TLS,
    pool: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
    tls:{
        rejectUnauthorized: process.env.SMTP_USE_SSL
    }
});

const emailPath = path.join(__dirname, 'mail_templates');
const verifyEmail = fs.readFileSync(path.join(emailPath, 'verify.html')).toString();

function sendEmail(em, sb, data){
    sender.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}"<${process.env.MAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
        to: em,
        subject: sb,
        html: data
    })
}

function sendVerifyEmail(em, url){
    sendEmail(em,
        'Verify your account',
        verifyEmail.replaceAll('{email}', em)
            .replaceAll('{name}', process.env.SITE_NAME)
            .replaceAll('{url}', url));
}
module.exports = {sendVerifyEmail};