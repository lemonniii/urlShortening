var express = require('express');
var app = express();

var routes = require('./routes');

app.use('/', routes);

app.listen(3004, function() {
  console.log("Shortening URL API running on port 3004...");
});
