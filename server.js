var express = require('express');
var bodyParser = require('body-parser');
var app = module.exports = express();
var path = require('path');
var portNumber = process.env.PORT || 3000;
var platform = process.env.PLATFORM;
var baseDirectory = path.join(__dirname, '.dist/' + platform);
var todoCounter = 1;
var todos = [{
    id: todoCounter++,
    name: 'First Sample',
    text: 'A todo to use as a sample.'
  },
  {
    id: todoCounter++,
    name: 'Second Sample',
    text: 'Yet another todo to use as a sample.'
  }
];

// Configure body parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.route('/api/todos')
  .get(function (req, res) {
    res.send(todos);
  })
  .post(function (req, res) {
    var todo = {
      id: todoCounter++,
      name: req.body.name,
      text: req.body.text
    };

    todos.push(todo);

    res.send(todo);
  });

app.use(express.static(baseDirectory));

app.listen(portNumber, function () {
  console.log('App started listening on port ' + portNumber + ' serving from ' + baseDirectory + '!');
});