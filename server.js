		var express = require('express');
		var app = express();
		var port = process.env.PORT || 3000;

		app.use(express.static('public'));

		app.use(express.static('src/views'));
		app.get('/', function(req, res) {
			res.render('index');
		});

		app.listen(port, process.env.IP, 1, function() {

			console.log('Listening on ' + process.env.IP + ':' + port);
		});