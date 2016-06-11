var Pictures = require('../models/pictures')
var log = require('../../log/log').getLog('MONGO')

exports.getPictures = function (query) {
  return Pictures.find(query)
    .select({name: 1, type: 1, date: 1, _id: 0})
    .exec()
    .then(function (pictures) {
      log.info('GET ', JSON.stringify.query)
      return pictures.map(function (picture) {
        return picture._doc
      })
    })
    .catch(function (err) {
      log.error('ERR: ', err.message)
      throw err
    })
}

exports.getPicture = function (query) {
  return Pictures.findOne(query)
    .select({name: 1, type: 1, date: 1, _id: 0})
    .exec()
    .then(function (picture) {
      log.info('GET ', JSON.stringify(query))
      return picture ? picture._doc : null
    })
    .catch(function (err) {
      log.error('ERR: ', err.message)
      throw err
    })
}

exports.addPicture = function (data) {
  return Pictures.create(data)
    .then(function (picture) {
      log.info('ADDED ', picture)
      return picture
    })
    .catch(function (err) {
      log.warn('ERR: ', err.message)
      return err
    })
}

exports.deleteAll = function () {
  return Pictures.remove()
    .then(function (foo) {
      log.info('DELETE success')
    })
    .catch(function (err) {
      log.error('ERR: ', err.message)
      throw err
    })
}
