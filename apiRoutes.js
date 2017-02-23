module.exports = function(apiRouter, secret){
  var User = require('./app/models/user');
  var Player = require('./app/models/player');
  var Character = require('./app/models/character');

  // Public Access
  // API Landing, use version, put some funny message
  apiRouter.get('/', function(req, res) {
  	res.json({ message: 'INFERNO DIVIDER!' });
  });

  // Auth Point
  apiRouter.post('/auth', function(req, res){
    User.findOne({
      username: req.body.username
    }).select('username level password').exec(function(err, user){
      if (err) throw err;
      if(!user){
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        var validPass = user.comparePassword(req.body.password);
        if(!validPass){
          res.json({
            success: false,
            message: 'Authentication failed. Wrong Password.'
          });
        } else {
          var token = jwt.sign({
            name: user.username,
            level: user.level
          }, secret, {
            expiresIn: 24*60*60
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });

  // Users collection
  // GET - User list
  apiRouter.route('/users')
  	.get(function(req, res){
  		User.find(function(err, users){
  			if (err) res.send(err);
  			res.json(users);
  		});
  	});

  // GET - Single User by ID
  apiRouter.route('/users/:user_id')
  	.get(function(req, res){
  		User.findById(req.params.user_id, function(err, user){
  			if (err) res.send(err);
  			res.json(user);
  		});
  	});
}
