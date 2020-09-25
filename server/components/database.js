const db = require('../db');
const { uploadFileToS3 } = require('./aws');
const dayjs = require('dayjs')

exports.addEmailtoDB = async (emailSubject, emailAddress, emailHTML) => {
    try {
        const formattedDate = dayjs().format('MM-DD-YY'); // Folder
        const formattedTime = dayjs().format('HHmmssSSS'); // Name (should always be unique)
        const emailURL = await uploadFileToS3(`${formattedDate}/${formattedTime}.html`, emailHTML);

        await db.query(
            "INSERT INTO emails(email_address, email_subject, email_link) VALUES($1, $2, $3);", 
            [emailAddress, emailSubject, emailURL]
        );
    } catch (error) {
        throw new Error('Error adding email to DB', error);
    }
}

