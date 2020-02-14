const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000, () => {
	console.log('Meowdy! Node is working on port 3000!')
});

app.set('view engine', 'pug');

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

