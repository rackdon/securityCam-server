var request = require('request')

module.exports = function setup (app) {
  app.get('/video/motion', function (req, res) {
    request('http://localhost:8081').pipe(res)
  })
}
