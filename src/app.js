const express = require('express');
const musicList = require('./songs.js').songsList; 
const app = express();

app.use('', express.static('public'));

app.get('/getMusic', function(req, res) {
	res.send(JSON.stringify(musicList));
});

app.listen(3000, function() {
	console.log('Example app running...');
});
