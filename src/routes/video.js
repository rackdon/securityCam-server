var request = require('request')
var log = require('../log/log').getLog('VIDEO')

module.exports = function setup (app) {
  app.get('/video/motion', function (req, res) {
    log.info('GET /video/motion')
    request('http://localhost:8081')
      .on('error', function (err) {
        log.error('ERR: ', err.message)
        res.status(500).send(err.message)
      })
      .pipe(res)
  })
}
