const express = require('express');
const { sendEmail } = require('./mail');

const admin = require('firebase-admin');
const { db } = require('./firebase');
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

app.get('/users', async (req, res) => {
  try {
    const users = [];
    const snapshot = await db.collection('user').get();
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
