const express = require('express');
const mailer = require('./nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.listen(3000, () => {
	console.log('Meowdy! Node is working on port 3000!')
});

app.get('/', (req, res) => {
	res.render('index.pug')
})

app.get('/about', (req, res) => {
	res.render('about.pug', { link: 'about' })
})

app.get('/price', (req, res) => {
	res.render('price.pug', { link: 'price' })
})

app.get('/reviews', (req, res) => {
	res.render('reviews.pug', { link: 'reviews' })
})

app.get('/contacts', (req, res) => {
	res.render('contacts.pug', { link: 'contacts' })
})

app.get('/services', (req, res) => {
	res.render('services.pug', { link: 'services' })
})

app.post('/mail', (req, res) => {
	if (req.body.Photo) {
		const message = {
			from: '<index@mail.com>',
			to: '<inbox@yandex.ru>',
			subject: 'Smth new',
			html: `<a href="tel:${req.body.Phone}">${req.body.Phone}</a>`,
			attachments: [
				{
					path: req.body.Photo.content
				}
			]
			
		};
		mailer(message);
	} else {
		const message = {
			from: '<index@mail.com>',
			to: '<inbox@yandex.ru>',
			subject: 'Smth new',
			html: `
			<h3>Новая заявка с сайта</h3>
			<p><b>Имя:</b> ${req.body["Имя"]}</p>
			<p><b>Телефон:</b> ${req.body["Телефон"]}</p>
			`,
		}
		mailer(message);
	}
	res.sendStatus(200)
})