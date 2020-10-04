exports.getLatestEmails = `
SELECT c.name AS company_name, c.logo, e.email_subject, e.email_link, e.created_at AS timestamp
FROM emails e
JOIN companies c ON e.email_address = c.email
JOIN most_recent_emails mre ON e.created_at = mre.max_date AND e.email_address = mre.email_address
ORDER BY timestamp DESC;
`