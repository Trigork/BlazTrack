// grab the packages that we need for the player model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// player schema
var PlayerSchema = new Schema({
  name: { type: String, required: true, index: { unique: true }},
  avatar_url: { type: String }
});

// return the model
module.exports = mongoose.model('Player', PlayerSchema);
