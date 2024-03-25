require('dotenv').config();
const nodemailer = require('nodemailer');
const SendMail = async (email,subject,content) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.mailUser,
                pass: process.env.mailPass
            }
        });

        const info = await transporter.sendMail({
            from: '"Connect2Campus.GCEK" <Connect2Campus.GCEK>',
            to: email,
            subject: subject,
            html:content
        });
    } catch (error) {
        console.log(error.message);
    }

};

module.exports={SendMail};