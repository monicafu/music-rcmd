const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', function(req, res) {
	res.send('Index');
});

app.get('/test', function(req, res) {
	res.send({
		express: "Hello from express"
	});
});

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
})