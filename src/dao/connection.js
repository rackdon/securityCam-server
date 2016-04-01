var mongoose = require('mongoose')

module.exports = function setup (app) {
  var db = app.get('configuration').db

  mongoose.connect(db, function (err, res) {
    if (err) {
      console.log('ERROR: connectiong to Database. ' + err)
    } else {
      console.log('Connected to Database ' + db)
    }
  })
}
