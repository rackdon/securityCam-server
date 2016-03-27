var mongoose = require('mongoose')
var Schema = mongoose.Schema

var picturesSchema = new Schema({
  name: {type: String},
  type: {type: String, enum: ['motion', 'periodic']}
})

module.exports = mongoose.model('Pictures', picturesSchema)
