const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendEmail = async ({ receipients, subject, message }) => {
    await transport.sendMail({
        from: `gentlebaby <${process.env.MAIL_USER}>`,
        to: receipients,
        subject,
        text: message,
        html: message,
    });
}

module.exports = { sendEmail };