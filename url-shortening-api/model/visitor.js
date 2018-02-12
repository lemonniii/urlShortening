var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitor = new Schema({
  ip: String,
  timestamp: String,
  deviceType: String
});

module.exports = mongoose.model('Visitor', visitor);
