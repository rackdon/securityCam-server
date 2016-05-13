var mongoose = require('mongoose')
var Schema = mongoose.Schema

var picturesSchema = new Schema({
  name: {type: String, unique: true, required: true},
  type: {type: String, enum: ['motion', 'periodic'], required: true},
  date: {type: String, unique: true, required: true}
})

module.exports = mongoose.model('Pictures', picturesSchema)
