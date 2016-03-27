var mongoose = require('mongoose')

module.exports = function setup () {
  mongoose.connect('mongodb://localhost/pictures', function (err, res) {
    if (err) {
      console.log('ERROR: connectiong to Database. ' + err)
    } else {
      console.log('Connected to Database')
    }
  })
}
