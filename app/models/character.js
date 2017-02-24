// grab the packages that we need for the player model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComboSchema = new Schema({
  position: { type: String },
  life_percent: { type: Number},
  counter: { type: Boolean },
  damage: { type: Number, required: true },
  input: { type: String, required: true }
})

var CharacterSchema = new Schema({
  code: { type: String, required: true, index: { unique: true }},
  name: { type: String, required: true, index: { unique: true }},
  description: { type: String },
  resources: { type: String },
  combos: [ComboSchema]
});

CharacterSchema.pre('save', function(next) {
  this.increment();
  next();
});

// return the model
module.exports = mongoose.model('Character', CharacterSchema);
