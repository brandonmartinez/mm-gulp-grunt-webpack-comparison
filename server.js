var express = require('express');
var app = express();
var path = require('path');
var baseDirectory = path.join(__dirname, '.dist/grunt');
var portNumber = 3000;

app.use(express.static(baseDirectory));

app.use(require('connect-livereload')({
  port: 35729,
  excludeList: ['.woff', '.flv']
}));

app.listen(portNumber, function () {
  console.log('Example app listening on port 3000!');
});