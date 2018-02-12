var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var url = new Schema({
  longUrl: String,
  shortUrl: String,
  numVisits: {type: Number, default: 0},
  visitors: [{type: ObjectId, ref:'Person'}]
});

module.exports = mongoose.model('Url', url);
