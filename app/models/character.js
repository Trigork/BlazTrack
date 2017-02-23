// grab the packages that we need for the player model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// player schema
var CharacterSchema = new Schema({
  code: { type: String, required: true, index: { unique: true }},
  name: { type: String, required: true, index: { unique: true }},
  description: {type: String},
  bnbs: { type: Array },
  resources: {type: Array}
});

// return the model
module.exports = mongoose.model('Character', CharacterSchema);
