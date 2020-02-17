const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'scottie.fadel@ethereal.email',
        pass: 'BbWKkusQwXprkTXMsT'
    }
});

const mailer = message => {
	transporter.sendMail(message, (err, info) => {
		if (err) console.log(err);
	})
}

module.exports = mailer