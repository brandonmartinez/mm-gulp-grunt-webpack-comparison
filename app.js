const express = require('express')
const app = express()

app.use(require('connect-livereload')({
  port: 35729,
  ignore: ['.js', '.svg']
}));


app.use('/', express.static('app'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})