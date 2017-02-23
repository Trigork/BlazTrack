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

    // Player manage operations
    // POST - Create player
    apiRouter.route('/players')
    .post(function(req, res){
      var player = new Player();

      player.name = req.body.name;
      player.avatar_url = req.body.avatar_url;

      player.save(function(err){
        if(err) {
          if (err.code == 11000){
            return res.json({
              success: false,
              message: 'Player already exists'
            })
          } else {
            return res.send(err);
          }
        }

        res.json({message: 'Player created!'});
      });
    });

    // PUT - Modify player specified by ID
    // DELETE - Delete player specified by ID
    apiRouter.route('/players/:player_id')
    	.put(function(req, res){
    		Player.findById(req.params.player_id, function(err, player){
    			if (err) res.send(err);
    			if (req.body.name) player.name = req.body.name;
    			if (req.body.avatar_url) player.avatar_url = req.body.avatar_url;

    			player.save(function(err){
    				if(err) res.send(err);
    				res.json({message: 'Player updated!'});
    			})
    		})
    	})
    	.delete(function(req, res){
    		Player.remove({
    			_id: req.params.player_id
    		}, function(err, user){
    			if (err) return res.send(err);
    			res.json({message: 'Player deleted'});
    		})
    	});

      // Character manage operations
      // POST - Create character
      apiRouter.route('/characters')
      .post(function(req, res){
        var character = new Character();

        character.code = req.body.code;
        character.name = req.body.name;
        character.description = req.body.description;
        character.bnbs = req.body.bnbs;
        character.resources = req.body.resources;

        character.save(function(err){
          if(err) {
            if (err.code == 11000){
              return res.json({
                success: false,
                message: 'Character already exists'
              })
            } else {
              return res.send(err);
            }
          }

          res.json({message: 'Character created!'});
        });
      });

      // PUT - Modify user specified by ID
      // DELETE - Delete user specified by ID
      apiRouter.route('/characters/:char_id')
      	.put(function(req, res){
      		Character.findById(req.params.char_id, function(err, char){
      			if (err) res.send(err);
      			if (req.body.code) char.code = req.body.code;
      			if (req.body.name) char.name = req.body.name;
            if (req.body.description) char.description = req.body.description;
            if (req.body.bnbs) char.bnbs = req.body.bnbs;
            if (req.body.resources) char.resources = req.body.resources;

      			char.save(function(err){
      				if(err) res.send(err);
      				res.json({message: 'Character updated!'});
      			})
      		})
      	})
      	.delete(function(req, res){
      		Character.remove({
      			_id: req.params.char_id
      		}, function(err, char){
      			if (err) return res.send(err);
      			res.json({message: 'Character deleted'});
      		})
      	});
}
