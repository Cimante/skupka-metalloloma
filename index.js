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