var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose 	 = require('mongoose');
var jwt = require('jsonwebtoken');
var config     = require('./config');
var path       = require('path');


mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

var apiRouter = express.Router();
require('./app/routes/public.routes')(apiRouter, config.secret);

// Auth Middleware
// Prevents users to use any of the points below without the token
apiRouter.use(function(req, res, next){
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	if (token){
		jwt.verify(token, config.secret, function(err, decoded){
			if (err){
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		})
	}
});

require('./app/routes/auth.routes')(apiRouter, config.secret);
app.use('/api', apiRouter);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('/admin', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/admin.html'));
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(config.port);
console.log('Magic happens on port ' + config.port);
