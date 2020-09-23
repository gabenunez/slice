const express = require('express');
const app = express();
const port =  process.env.PORT || 1818;

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