const fs = require('fs');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

module.exports = (req, res) => {
    const { email } = req.body;

    if (!validateEmail(email)) {
        res.status(400).json({
            message: 'Invalid email',
        });
    }

    fs.readFile('./src/data/emails.json', (err, data) => {
        if (err) throw err;
        const emailsData = JSON.parse(data);

        if (emailsData.emails.includes(email)) {
            res.status(409).json({
                message: 'Email already exists',
            });
        } else {
            emailsData.emails.push(email);

            fs.writeFile('./src/data/emails.json', JSON.stringify(emailsData), (error) => {
                if (error) throw error;
                res.status(200).json({
                    message: 'Email added successfully',
                });
            });
        }
    });
};
