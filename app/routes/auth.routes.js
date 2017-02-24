module.exports = function(apiRouter, secret){
  var mongoose = require('mongoose');
  var ObjectId = require('mongoose').Types.ObjectId;
  var User = require('../models/user');
  var Player = require('../models/player');
  var Character = require('../models/character');
  var Tournament = require('../models/tournament');

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

  // Players
  // POST - Create new Player
  apiRouter.route('/players')
    .post(function(req, res){
      var player = new Player();
      player.nickname = req.body.nickname;
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
  			if (req.body.nickname) player.nickname = req.body.nickname;
  			if (req.body.avatar_url) player.avatar_url = req.body.avatar_url;

  			user.save(function(err){
  				if(err) res.send(err);
  				res.json({message: 'Player updated!'});
  			})
  		})
  	})
  	.delete(function(req, res){
  		User.remove({
  			_id: req.params.player_id
  		}, function(err, player){
  			if (err) return res.send(err);
  			res.json({message: 'Player deleted'});
  		})
  	});

  // Characters
  // POST - Create new Character
  apiRouter.route('/characters')
    .post(function(req, res){
      var char = new Character();
      char.code = req.body.code;
      char.name = req.body.name;
      char.description = req.body.description;
      char.resources = req.body.resources;
      char.combos = req.body.combos;

      char.save(function(err){
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

  // PUT - Modify character specified by ID
  // DELETE - Delete character specified by ID
  apiRouter.route('/characters/:char_id')
  	.put(function(req, res){
  		Character.findById(req.params.char_id, function(err, char){
  			if (err) res.send(err);
        if (req.body.code) char.code = req.body.code;
        if (req.body.name) char.name = req.body.name;
        if (req.body.description) char.description = req.body.description;
        if (req.body.resources) char.resources = req.body.resources;
        if (req.body.combos) char.combos = req.body.combos;

  			char.save(function(err){
  				if(err) res.send(err);
  				res.json({message: 'Character updated!'});
  			});
  		});
  	})
  	.delete(function(req, res){
  		Character.remove({
  			_id: req.params.char_id
  		}, function(err, char){
  			if (err) return res.send(err);
  			res.json({message: 'Character deleted'});
  		})
  	});

  //TODO FIX DATE STUFF

  // Tournaments
  // POST - Create new Tournament
  apiRouter.route('/tournaments')
    .post(function(req, res){
      var tourn = new Tournament();
      tourn.name = req.body.name;
      tourn.date = new Date(req.body.date);
      tourn.complete = req.body.complete;
      tourn.players = req.body.players;
      tourn.standings = req.body.standings;
      tourn.branches = req.body.branches;

      tourn.save(function(err){
        if(err) {
          if (err.code == 11000){
            return res.json({
              success: false,
              message: 'Tournament already exists'
            })
          } else {
            return res.send(err);
          }
        }
        res.json({message: 'Tournament created!'});
      });
    });

  // PUT - Modify tournament specified by ID
  // DELETE - Delete tournament specified by ID
  apiRouter.route('/tournaments/:tourn_id')
    .put(function(req, res){
      Tournament.findById(req.params.tourn_id, function(err, tourn){
        if (err) res.send(err);
        if (req.body.name) tourn.name = req.body.name;
        if (req.body.date) tourn.date = new Date(req.body.date);
        if (req.body.complete) tourn.complete = req.body.complete;
        if (req.body.players) tourn.players = req.body.players;
        if (req.body.standings) tourn.standings = req.body.standings;
        if (req.body.branches) tourn.branches = req.body.branches;

        tourn.save(function(err){
          if(err) res.send(err);
          res.json({message: 'Tournament updated!'});
        });
      });
    })
    .delete(function(req, res){
      Tournament.remove({
        _id: req.params.tourn_id
      }, function(err, tourn){
        if (err) return res.send(err);
        res.json({message: 'Tournament deleted'});
      })
    });
}
