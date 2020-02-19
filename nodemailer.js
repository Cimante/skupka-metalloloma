const nodemailer = require('nodemailer')
/*
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'scottie.fadel@ethereal.email',
        pass: 'BbWKkusQwXprkTXMsT'
    }
});
*/
const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'skupkametalloloma2020@yandex.ru',
        pass: 'qa147896325++'
    }
});
const mailer = message => {
	transporter.sendMail(message, (err, info) => {
		if (err) console.log(err);
	})
}

module.exports = mailer