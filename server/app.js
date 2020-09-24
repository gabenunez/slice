require('dotenv').config()
const express = require('express');
const app = express();
const port =  process.env.PORT || 1818;
const notifier = require('mail-notifier');

app.use(express.json());

// Handle API Newsletter Email Requests
app.use('/api/emails', require('./routes/shopify'));

// 404. Handle when a path doesn't exist.
app.use((req, res) => {
    res.status(404).json({code: "404", error: "Sorry, that's an invalid path."});
});

app.listen(port, () => {
    if(process.env.NODE_ENV) {
        console.log(`API listening on port ${port}!`)
    }
});

const emailNotifier = notifier({
    user: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

emailNotifier.on('end', () => emailNotifier.start())
  .on('mail', mail => {
      console.log(mail);
    })
  .start();