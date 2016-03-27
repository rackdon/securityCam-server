var express = require('express')
var bodyParser = require('body-parser')
var glob = require('glob')

// Set up the express server
var app = express()

// parse application/json
app.use(bodyParser.json())

// Routes initialization
app.get('/', function (req, res) {
  res.send('Security Cam express server')
})

// find all express route files
var routes = glob.sync('src/routes/**/*.js')

function addToServer (path) {
  console.log(path + ' added to express')
  require(path)(app)
}

routes.forEach(addToServer)

app.listen(8082, function () {
  console.log('Node server running on http://localhost:8082')
})

module.exports = app
