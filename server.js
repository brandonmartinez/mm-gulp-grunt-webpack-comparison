var express = require('express');
var app = express();
var path = require('path');
var portNumber = process.env.PORT || 3000;
var platform = process.env.PLATFORM;
var baseDirectory = path.join(__dirname, '.dist/' + platform);

app.use(express.static(baseDirectory));

app.use(require('connect-livereload')({
  port: 35729,
  excludeList: ['.woff', '.flv']
}));

app.listen(portNumber, function () {
  console.log('Example app listening on port ' + portNumber + ' serving from ' + baseDirectory + '!');
});