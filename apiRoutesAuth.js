module.exports = function(apiRouter, secret){
  var jwt = require('jsonwebtoken');
  var User = require('./app/models/user');
  var Player = require('./app/models/player');
  var Character = require('./app/models/character');

  // Auth Middleware
  // Prevents users to use any of the points below without the token
  apiRouter.use(function(req, res, next){
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token){
      jwt.verify(token, secret, function(err, decoded){
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

  // Requires Auth Access
  // Logged user (from token)
  apiRouter.get('/me', function(req, res){
    res.send(req.decoded);
  });

  // User manage operations
  // POST - Create user
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
  });

  // PUT - Modify user specified by ID
  // DELETE - Delete user specified by ID
  apiRouter.route('/users/:user_id')
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
}
