const express = require('express');
const mailer = require('./nodemailer');
const bodyParser = require('body-parser');

const https = require('https');
const http = require('http');
const fs = require('fs')

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
// app.use(express.json()) -- блокирует файлы больше 100кб :(
app.use(bodyParser.json({limit: '20mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
/*
app.listen(3000, () => {
	console.log('Meowdy! Node is working on port 3000!')
});
*/
const httpsOptions = {
	key: fs.readFileSync('privatekey.key'),
	cert: fs.readFileSync('certificate.crt')
}

https.createServer(httpsOptions, app).listen(443, () => {
	console.log('Meowdy! Node is working on port 443!')
});
http.createServer(function(req, res) {
	res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	res.end();
}).listen(80);

app.get('/', (req, res) => {
	const meta = {
		title: 'Прием металлолома, пункт приема лома черных и цветных металлов в Одинцово',
		description: 'Прием металлолома, пункт приема лома черных и цветных металлов в Одинцово',
		keywords: 'прием металлолома, прием цветных металлов, металлолом одинцово, пункт приема металла, пункт приема цветного металла, прием металла одинцово, пункт металлолома, пункт приема металлолома, прием металлолома в одинцово, прием цветных металлов в одинцово, прием лома одинцово, металлолом одинцово пункт приема, металлолом одинцово пункт'
	}
	res.render('index.pug', { meta: meta })
})

app.get('/about', (req, res) => {
	const meta = {
		title: 'Прием черного и цветного лома металла, сдать металлолом в Одинцово дорого',
		description: 'ООО Стандарт осуществляет прием черного и цветного лома металла, у нас можно сдать машину, дверь и прочий металлолом в Одинцово дорого.',
		keywords: 'прием лома металла, сдача металлолома, прием цветного лома, прием лома цветных металлов, сдать металлолом в одинцово, машину на металлолом, металл прием металлолома, прием черного лома, сдать дверь на металлолом, прием лома дорого'
	}
	res.render('about.pug', { link: 'about', meta: meta })
})

app.get('/price', (req, res) => {
	const meta = {
		title: 'Прием черного и цветного металлолома, цена за 1 кг в Одинцово',
		description: 'У нас можно сдать черный и цветной металлолом дорого! Прием в Одинцово, цена за 1 кг — до 370 рублей!',
		keywords: 'металлолом цена, прием цветных металлов цены, прием металлолома цена, металлолом цена за кг, сдать металлолом цена, прием металла одинцово цена, металлолом цена за 1, цена металлолома за 1 кг, металлолом цена одинцово, цветной металлолом цены'
	}
	res.render('price.pug', { link: 'price', meta: meta })
})

app.get('/services', (req, res) => {
	const meta = {
		title: 'Сдать металлолом с вывозом, демонтаж и вывоз металла в Одинцово',
		description: 'У нас можно сдать металлом с вывозом! Сделаем все сами! Демонтаж, прием и вывоз черного и цветного металла в Одинцово.',
		keywords: 'У нас можно сдать металлом с вывозом! Сделаем все сами! Демонтаж, прием и вывоз черного и цветного металла в Одинцово.'
	}
	res.render('services.pug', { link: 'services', meta: meta })
})


app.get('/reviews', (req, res) => {
	const meta = {
		title: 'Выгодно сдать металлолом: отзывы клиентов пункта приема лома ООО Стандарт',
		description: 'Не знаетет где и как выгодно сдать металлолом? Вам точно помогут отзывы клиентов пункта приема лома ООО Стандарт!',
		keywords: 'отзывы металлолом, отзывы прием лома, сдать металлолом отзывы'
	}
	res.render('reviews.pug', { link: 'reviews', meta: meta })
})

app.get('/contacts', (req, res) => {
	const meta = {
		title: 'Прием металлолома рядом, адрес, точка на карте, телефон ООО Стандарт',
		description: 'Есть металлом, и думаете где есть прием металла рядом со мной? Вам помогут контакты ООО Стандарт: адрес, точка на карте, номер телефона.',
		keywords: 'металлолом где, прием металла карта, металлолом рядом, прием металлолома рядом, металлолом рядом со мной, металлолом телефон, металлолом на карте, прием металлолома на карте, номер телефона металлолома, прием металлолома рядом со мной, металлолом адрес'
	}
	res.render('contacts.pug', { link: 'contacts', meta: meta })
})

app.post('/mail', (req, res) => {
	if (req.body.Photo) {
		const message = {
			from: '<skupkametalloloma2020@yandex.ru>',
			to: '<standart-lom@inbox.ru>',
			subject: 'Оцените этот лом как можно скорее',
			html: `
			<span>Телефон для связи: </span>
			<a href="tel:${req.body.Phone}">${req.body.Phone}</a>`,
			attachments: [
				{
					path: req.body.Photo.content
				}
			]
		};
		const message_duplicate = {
			from: '<skupkametalloloma2020@yandex.ru>',
			to: '<zakazarakelovgroup@yandex.ru>',
			subject: 'OOO Стандарт: заявка на оценку лома',
			html: `
			<h3>На сайте skupka-metalloloma.com отправили новую заявку на оценку лома</h3>
			<span>Телефон для связи: </span>
			<a href="tel:${req.body.Phone}">${req.body.Phone}</a>`,
			attachments: [
				{
					path: req.body.Photo.content
				}
			]
		};
		mailer(message);
		mailer(message_duplicate);
	} else {
		const message = {
			from: '<skupkametalloloma2020@yandex.ru>',
			to: '<standart-lom@inbox.ru>',
			subject: 'Новая заявка с сайта',
			html: `
			<h3>Новая заявка с сайта</h3>
			<p><b>Имя:</b> ${req.body["Имя"]}</p>
			<p><b>Телефон:</b> ${req.body["Телефон"]}</p>
			`,
		};
		const message_duplicate = {
			from: '<skupkametalloloma2020@yandex.ru>',
			to: '<zakazarakelovgroup@yandex.ru>',
			subject: 'Новая заявка с сайта',
			html: `
			<h3>На сайте skupka-metalloloma оставили новую заявку</h3>
			<p><b>Имя:</b> ${req.body["Имя"]}</p>
			<p><b>Телефон:</b> ${req.body["Телефон"]}</p>
			`,
		}
		mailer(message);
		mailer(message_duplicate);
	}
	res.sendStatus(200)
})