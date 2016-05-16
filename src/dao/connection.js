var mongoose = require('mongoose')
var log = require('../log/log').getLog('MONGO')

module.exports = function setup (app) {
  var db = app.get('configuration').db

  mongoose.connect(db, function (err, res) {
    if (err) {
      log.error('ERROR: connectiong to Database. ' + err)
    } else {
      log.info('Connected to Database ' + db)
    }
  })
}
