var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose 	 = require('mongoose');
var config     = require('./config');
var path       = require('path');

var User = require('./app/models/user');

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

// get an instance of the express router
var apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
	res.json({ message: 'INFERNO DIVIDER!' });
});

apiRouter.route('/users')
	.post(function(req, res){
		var user = new User();

		user.username = req.body.username;
		user.password = req.body.password;
		user.level = req.body.level;

		user.save(function(err){
			if(err) {
				if (err.code == 11000){
					return res.json({
						success: false,
						message: 'User already exists'
					})
				} else {
					return res.send(err);
				}
			}

			res.json({message: 'User created!'});
		});
	})
	.get(function(req, res){
		User.find(function(err, users){
			if (err) res.send(err);
			res.json(users);
		});
	});

apiRouter.route('/users/:user_id')
	.get(function(req, res){
		User.findById(req.params.user_id, function(err, user){
			if (err) res.send(err);
			res.json(user);
		})
	})
	.put(function(req, res){
		User.findById(req.params.user_id, function(err, user){
			if (err) res.send(err);
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;
			if (req.body.level) user.level = req.body.level;

			user.save(function(err){
				if(err) res.send(err);
				res.json({message: 'User updated!'});
			})
		})
	})
	.delete(function(req, res){
		User.remove({
			_id: req.params.user_id
		}, function(err, user){
			if (err) return res.send(err);
			res.json({message: 'User deleted'});
		})
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(config.port);
console.log('Magic happens on port ' + config.port);
