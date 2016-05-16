var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
var glob = require('glob')
var log = require('./log/log').getLog('SERVER')

// Set Environment variables
var env = process.env.NODE_ENV || 'development'
app.set('configuration', require('./environments/setup')(env))

// parse application/json
app.use(bodyParser.json())

// Routes initialization
app.get('/', function (req, res) {
  res.send('Security Cam express server')
})

// find all express route files
var routes = glob.sync('src/{dao,socket,routes}/*.js')

function addToServer (path) {
  if (path.indexOf('socket') !== -1) {
    require(path)(app, io)
  } else {
    require(path)(app)
  }
  log.info(path + ' added to express')
}

routes.forEach(function (route) {
  route = route.replace('src', '.')
  addToServer(route)
})

http.listen(8082, function () {
  log.info('Node server running on http://localhost:8082')
})

module.exports = app
