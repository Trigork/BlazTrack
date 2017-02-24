// grab the packages that we need for the player model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
  complete: { type: Boolean },
  players: {
    p1: { type: Schema.Types.ObjectId, ref: 'Player' },
    p2: { type: Schema.Types.ObjectId, ref: 'Player' }
  },
  result: {
    p1: { type : Number },
    p2: { type : Number }
  }
});

var RoundSchema = new Schema({
  complete: { type: Boolean },
  matches: [MatchSchema]
});

var TournamentSchema = new Schema({
  name: { type: String, required: true},
  date: { type: String, required: true, default: Date.now},
  complete: { type: Boolean },
  players: [{
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
    character: { type: Schema.Types.ObjectId, ref: 'Character' }
  }],
  standings: [{
    position: { type: Number },
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
    character: { type: Schema.Types.ObjectId, ref: 'Character' }
  }],
  branches: {
    winners: [RoundSchema],
    losers: [RoundSchema]
  }
});

TournamentSchema.pre('save', function(next) {
  this.increment();
  next();
});

// return the model
module.exports = mongoose.model('Tournament', TournamentSchema);
