module.exports = function(apiRouter, secret){
  var jwt = require('jsonwebtoken');
  var mongoose = require('mongoose');
  var ObjectId = require('mongoose').Types.ObjectId;
  var User = require('../models/user');
  var Player = require('../models/player');
  var Character = require('../models/character');
  var Tournament = require('../models/tournament');

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

  // Players collection
  // GET - Paginated Player List
  apiRouter.route('/players')
    .get(function(req, res){
      Player.find()
        .skip(parseInt(req.query.start))
        .limit(parseInt(req.query.count))
        .exec('find', function(err, players) {
          if (err) res.send(err);
    			res.json(players);
        });
    });

  // GET - Get player by id or nickname
  apiRouter.route('/players/:player_id')
    .get(function(req, res){
      var qResult = null;
      if(ObjectId.isValid(req.params.player_id)){
        qResult = Player.findOne({$or:
          [
            {"_id": req.params.player_id},
            {"nickname": req.params.player_id}
          ]
        });
      } else {
        qResult = Player.findOne(
            {"nickname": req.params.player_id}
        );
      }
      qResult.exec(function(err, player){
        if (err) res.send(err);
        res.json(player);
      });
    });

  // Character collection
  // GET - Paginated Character list
  apiRouter.route('/characters')
  .get(function(req, res){
    Character.find()
        .skip(parseInt(req.query.start))
        .limit(parseInt(req.query.count))
        .exec('find', function(err, chars) {
          if (err) res.send(err);
          res.json(chars);
        });
    });

  // GET - Character by id, code or name
  apiRouter.route('/characters/:char_id')
    .get(function(req, res){
      var qResult = null;
      if(ObjectId.isValid(req.params.char_id)){
        qResult = Character.findOne({$or:
          [
            {"_id": req.params.char_id},
            {"code": req.params.char_id},
            {"name": req.params.char_id}
          ]
        });
      } else {
        qResult = Character.findOne({$or:
          [
            {"code": req.params.char_id},
            {"name": req.params.char_id}
          ]
        });
      }
      qResult.exec(function(err, char){
        if (err) res.send(err);
        res.json(char);
      });
    });

  // Character Combos
  // GET - Paginated Combo List
  apiRouter.route('/characters/:char_id/combos')
    .get(function(req, res){
      var qResult = null;
      if(ObjectId.isValid(req.params.char_id)){
        qResult = Character.findOne({$or:
          [
            {"_id": req.params.char_id},
            {"code": req.params.char_id},
            {"name": req.params.char_id}
          ]
        });
      } else {
        qResult = Character.findOne({$or:
          [
            {"code": req.params.char_id},
            {"name": req.params.char_id}
          ]
        });
      }
      qResult.exec(function(err, char){
        if (err) res.send(err);
        res.json(char.combos);
      });
    });

  // Tournament Collection
  // GET - Paginated Tournament List
  // If date arguments are passed, they will be filtered
  apiRouter.route('/tournaments')
    .get(function(req, res){
      qResult = null;
      if (req.query.since || req.query.until){
        if (req.query.since){
          var startDate = new Date(req.query.since)
        } else {
          var startDate = new Date("1992-08-15");
        }
        if (req.query.until){
          var endDate = new Date(req.query.until)
        } else {
          var endDate = new Date(Date.now())
        }
        if (startDate > endDate){
          return res.status(400).send({
            success: false,
            message: 'Start Date can\'t be greater than End Date!'
          });
        }
        qResult = Tournament.find({
          "date" : {"$gte": startDate, "$lte": endDate}
        });
      } else {
        qResult = Tournament.find();
      }
      qResult.skip(parseInt(req.query.start))
          .limit(parseInt(req.query.count))
          .exec('find', function(err, tourns) {
            if (err) res.send(err);
            res.json(tourns);
          });
      });

  //TODO FIX DATE STUFF

  // GET - Single Tournament
  // Find by ID or Date
  apiRouter.route('/tournaments/:tourn_id')
    .get(function(req, res){
      var qResult = null;
      if(ObjectId.isValid(req.params.tourn_id)){
        qResult = Tournament.findOne({$or:
          [
            {"_id": req.params.tourn_id},
            {"date": new Date(req.params.tourn_id)}
          ]
        });
      } else {
        qResult = Tournament.findOne({
          "date": new Date(req.params.char_id)
        });
      }
      qResult.exec(function(err, tourn){
        if (err) res.send(err);
        res.json(tourn);
      });
    });
}
