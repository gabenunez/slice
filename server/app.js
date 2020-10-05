require('dotenv').config()
const express = require('express');
const app = express();
const port =  process.env.PORT || 1818;
const notifier = require('mail-notifier');
const { addEmailtoDB } = require('./components/database');

// Handle static assets, like logos :D
app.use(express.static(`${__dirname}/public`));

// Transform dat JSON
app.use(express.json());

// Handle API Newsletter Email Requests
app.use('/api/emails', require('./routes/emails'));

// 404. Handle when a path doesn't exist.
app.use((req, res) => {
    res.status(404).json({code: "404", error: "Sorry, that's an invalid path."});
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

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
  .on('mail', async mail => {
      try {
        await addEmailtoDB(mail.subject, mail.from[0].address, mail.html)
      } catch (error) {
        console.error(error)
      }
    })
  .start();