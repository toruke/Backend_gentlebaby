const express = require('express');
const { sendEmail } = require('./mail');

const app = express();

app.use(express.json());

app.post('/send-email', (req, res) => {
    const {name, email} = req.body;

    const subject = 'Welcome to GentleBaby';
    const message = `<h1>Hello ${name}, welcome to GentleBaby!</h1><p>We are glad to have you with us.</p>
    <div>Best regards,<br/>The GentleBaby Team</div>
    
    `;
    const receipients = `${name} <${email}>`;

    sendEmail({receipients, subject, message})
});

module.exports = app;