// grab the packages that we need for the player model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  nickname: { type: String, required: true, index: { unique: true }},
  avatar_url: { type: String }
});

PlayerSchema.pre('save', function(next) {
  this.increment();
  next();
});

// return the model
module.exports = mongoose.model('Player', PlayerSchema);
