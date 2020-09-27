const express = require('express');
const router = express.Router();
const db = require('../db');
const { getLatestEmails } = require('../db/queries');

router.get('/latest', async (req, res) => {
    try {
        const latestEmails = await db.query(getLatestEmails);
        res.json(latestEmails.rows);
    } catch (error) {
        res.status(500).json({error: 'Trouble communicating with database.'});
        console.error(error);
    }
});

module.exports = router;