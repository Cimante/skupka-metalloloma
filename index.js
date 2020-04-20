const express = require('express');
const mailer = require('./nodemailer');
const bodyParser = require('body-parser');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

const https = require('https');
const http = require('http');
const fs = require('fs')

const app = express();
app.use(compression({
	threshold: 1,
	chunkSize: 8192,
	level: 9,
	memLevel: 9,
	filter: function() { return true; }
}));

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
		title: 'Прием металлолома, пункт приема лома черных и цветных металлов в  Москве и МО',
		description: 'Пункт приема металлолома ООО Стандарт осуществляет прием лома черных и цветных металлов в  Москве и МО по выгодным ценам.',
		keywords: 'прием металлолома, прием цветных металлов, металлолом москва, пункт приема металла, пункт приема цветного металла, прием металла в москве, пункт металлолома, пункт приема металлолома, прием металлолома в москве, прием лома в москве'
	}
	res.render('index.pug', { meta: meta })
})

app.get('/about', (req, res) => {
	const meta = {
		title: 'Прием лома черных и цветных металлов, сдать металлолом в Москве и МО',
		description: 'ООО Стандарт осуществляет прием лома черного и цветного металла, у нас можно сдать металлолом в Москве и МО дорого',
		keywords: 'прием черных металлов, прием лома металла, прием цветных металлов в москве, сдача металлолома, прием цветного лома, прием лома цветных металлов, сдать металлолом в москве, сдать металл в москве, металл прием металлолома, прием черного лома'
	}
	res.render('about.pug', { link: 'about', meta: meta })
})

app.get('/price', (req, res) => {
	const meta = {
		title: 'Прием черного и цветного металлолома, цена за 1 кг в Москве и МО',
		description: 'У нас можно сдать черный и цветной металлолом дорого! Прием в Москве и МО, цена за 1 кг — до 370 рублей!',
		keywords: 'металлолом цена, прием цветных металлов цены, прием металлолома цена, металлолом цена за кг, сдать металлолом цена, прием металла в москве цены, металлолом цена за 1, цена металлолома за 1 кг, металлолом в москве цена за кг, цветной металлолом цены, прайс приема металлолома'
	}
	res.render('price.pug', { link: 'price', meta: meta })
})

app.get('/services', (req, res) => {
	const meta = {
		title: 'Сдать металлолом с вывозом, демонтаж и вывоз металла в Москве и МО',
		description: 'У нас можно сдать металлом с вывозом! Сделаем все сами! Демонтаж, прием и вывоз черного и цветного металла в Москве и МО',
		keywords: 'вывоз металлолома, вывоз металлолома москва, вывоз металла, сдать металлолом с вывозом, самовывоз металлолома, вывоз металлолома металла, прием металла с вывозом, демонтаж металлолома, сдать металлолом с вывозом цена, вывоз черного металла, прием металлолома самовывоз'
	}
	res.render('services.pug', { link: 'services', meta: meta })
})

app.get('/reviews', (req, res) => {
	const meta = {
		title: 'Выгодно сдать металлолом: отзывы клиентов пункта приема лома ООО Стандарт',
		description: 'Не знаете где и как выгодно сдать металлолом? Вам точно помогут отзывы клиентов пункта приема лома ООО Стандарт!',
		keywords: 'отзывы металлолом, отзывы прием лома, прием металлолома отзывы, пункт приема металлолома отзывы, отзывы о сдаче металлолома, сдать металлолом отзывы'
	}
	res.render('reviews.pug', { link: 'reviews', meta: meta })
})

app.get('/contacts', (req, res) => {
	const meta = {
		title: 'Прием металлолома рядом, адрес, точка на карте, телефон ООО Стандарт',
		description: 'Хотите сдать металлом, и думаете, где есть прием металла рядом со мной? Вам помогут контакты ООО Стандарт: адрес, точка на карте, номер телефона',
		keywords: 'прием металлолома рядом со мной, прием металла на карте, металлолом рядом, прием металлолома рядом, металлолом рядом со мной, металлолом телефон, прием металлолома на карте, номер телефона металлолома, прием металлолома рядом со мной, металлолом адрес'
	}
	res.render('contacts.pug', { link: 'contacts', meta: meta })
})
/*
app.get('/ ', (req, res) => {
	const meta = {
		title: '',
		description: '',
		keywords: ''
	}
	res.render(' .pug', { meta: meta })
})
*/
app.get('/cuprum', (req, res) => {
	const meta = {
		title: 'Пункт приема меди: сдать лом меди, цена за 1 кг в Москве и МО',
		description: 'ООО Стандарт – это пункт приема меди, где можно сдать лом меди в Москве и МО дорого, ведь наша цена за 1 кг – до 360 рублей!',
		keywords: 'медь цена за кг, медь цена за 1, медь цена за 1 кг, прием меди, лом меди цена, сдать медь, лом меди цена за кг, стоимость меди, пункт приема меди, прием меди в Москве'
	}
	res.render('pages/cuprum.pug', { meta: meta })
})

app.get('/aluminium', (req, res) => {
	const meta = {
		title: 'Сдать алюминий: пункт приема лома алюминия, цена за 1 кг в Москве и МО',
		description: 'Сдать алюминий дорого Вам поможет ООО Стандарт - пункт приема лома алюминия, где цена за 1 кг в Москве и МО – до 105 рублей!',
		keywords: 'лом алюминия цена, алюминий цена за 1 кг, сколько стоит алюминий, алюминий лом цена за кг, алюминий цена за 1, прием алюминия, цена алюминия в москве, сдать алюминий, цена за кг алюминия в москве, алюминий кг лома'
	}
	res.render('pages/aluminium.pug', { meta: meta })
})

app.get('/brass', (req, res) => {
	const meta = {
		title: 'Сдать латунь: пункт приема лома латуни, цена за 1 кг в Москве и МО',
		description: 'Сдать латунь дорого Вам поможет ООО Стандарт - пункт приема лома латуни, где цена за 1 кг в Москве и МО – до 210 рублей!',
		keywords: 'латунь цена, латунь за кг, латунь цена за кг, лом латуни цена, прием латуни, латунь цена за 1 кг, сдать латунь, прием латуни цена, сдать латунь цена, сдать латунь в москве'
	}
	res.render('pages/brass.pug', { meta: meta })
})

app.get('/plumbum', (req, res) => {
	const meta = {
		title: 'Сдать свинец: пункт приема лома свинца, цена за 1 кг в Москве и МО',
		description: 'Сдать свинец дорого Вам поможет ООО Стандарт - пункт приема лома свинца, где цена за 1 кг в Москве и МО – до 210 рублей!',
		keywords: 'свинец цена, свинец цена за кг, свинец цена за 1, лом свинца, прием свинца, лом свинца цена, лом свинца за кг, сдать свинец, лом свинца цена за кг, прием свинца цена'
	}
	res.render('pages/plumbum.pug', { meta: meta })
})

app.get('/accumulators', (req, res) => {
	const meta = {
		title: 'Сдать старый аккумулятор автомобильный: прием аккумуляторов б у, цена в Москве и МО',
		description: 'Сдать старый аккумулятор автомобильный бу дорого можно в ООО Стандарт: прием аккумуляторов б у в Москве и МО по цене до 52 рублей!',
		keywords: 'прием аккумуляторов б у, прием аккумуляторов в москве, сдать аккумулятор бу, сдать аккумулятор автомобильный, сдать аккумулятор, прием аккумуляторов, сдать аккумулятор цена, сдать аккумулятор в москве, сдать старый аккумулятор, прием аккумуляторов цена'
	}
	res.render('pages/accumulators.pug', { meta: meta })
})

app.get('/stainless', (req, res) => {
	const meta = {
		title: 'Сдать нержавейку: пункт приема лома нержавейки, цена за 1 кг (Москва и МО)',
		description: 'Сдать нержавейку дорого Вам поможет ООО Стандарт - пункт приема лома нержавейки, где цена в Москве и МО за 1 кг – до 60 рублей!',
		keywords: 'лом нержавейки, лом нержавейки цена, сдать нержавейку, лом нержавейки москва, нержавейка цена за кг лом, прием нержавейки, нержавейка лом цена москва, сдать нержавейку цена, прием нержавейки цена, прием лома нержавейки'
	}
	res.render('pages/stainless.pug', { meta: meta })
})

app.get('/cable', (req, res) => {
	const meta = {
		title: 'Сдать кабель бу: прием лома медного кабеля в изоляции, цена за 1 кг в Москве и МО',
		description: 'Сдать кабель бу дорого Вам поможет ООО Стандарт: прием лома медного кабеля в изоляции, цены за 1 кг в Москве и МО – до 370 рублей!',
		keywords: 'прием кабеля, сдать кабель, лом кабеля, прием кабеля москва, прием кабеля в изоляции, сдать кабель в москве, прием лома кабеля, прием медного кабеля, сдать кабель бу, сдать кабель в изоляции'
	}
	res.render('pages/cable.pug', { meta: meta })
})

app.get('/vehicle', (req, res) => {
	const meta = {
		title: 'Сдать машину: прием автомобилей на металлолом, цена в Москве и МО',
		description: 'Сдать машину Вы можете в ООО Стандарт, где на прием автомобилей на металлолом в Москве и МО выгодная цена – до 14000 рублей за тонну.',
		keywords: 'сдать машину на металлолом, машину на металлолом цена, сдать машину на металлолом цена, сдать автомобиль на металлолом, сдать авто на металлолом, автомобиль на металлолом цена, машина на металлолом цена москва, прием автомобилей на металлолом, сдать автомобиль на металлолом цена, прием авто на металлолом'
	}
	res.render('pages/vehicle.pug', { meta: meta })
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
			<p><b>Текст:</b>${req.body["Текст"]}</p>
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
			<p><b>Текст:</b>${req.body["Текст"]}</p>
			`,
		}
		mailer(message);
		mailer(message_duplicate);
	}
	res.sendStatus(200)
})

app.get('/sitemap.xml', function(req, res) {
	res.sendFile(__dirname + '/sitemap.xml');
})

app.get('/robots.txt', function(req, res) {
	res.sendFile(__dirname + "/robots.txt")
})

app.get('/manifest.json', function(req, res) {
	res.sendFile(__dirname + "/manifest.json")
})