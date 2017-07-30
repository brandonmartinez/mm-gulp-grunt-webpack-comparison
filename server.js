var express = require('express');
var app = module.exports = express();
var path = require('path');
var portNumber = process.env.PORT || 3000;
var platform = process.env.PLATFORM;
var baseDirectory = path.join(__dirname, '.dist/' + platform);

app.use(express.static(baseDirectory));

app.listen(portNumber, function () {
  console.log('App started listening on port ' + portNumber + ' serving from ' + baseDirectory + '!');
});