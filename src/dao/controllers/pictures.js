var Pictures = require('../models/pictures')

exports.getPictures = function (query) {
  return Pictures.find(getFormedQuery(query))
    .select({name: 1, type: 1, date: 1, _id: 0})
    .exec()
    .then(function (pictures) {
      console.log('GET /pictures')
      return pictures.map(function (picture) {
        return picture._doc
      })
    })
    .catch(function (err) {
      console.log('ERR: ', err.message)
      throw err
    })
}

exports.getPicture = function (query) {
  return Pictures.findOne(getFormedQuery(query))
    .select({name: 1, type: 1, date: 1, _id: 0})
    .exec()
    .then(function (picture) {
      console.log('GET /pictures/picture?' + JSON.stringify(query))
      return picture ? picture._doc : null
    })
    .catch(function (err) {
      console.log('ERR: ', err.message)
      throw err
    })
}

exports.addPicture = function (data) {
  return Pictures.create(data)
    .then(function (picture) {
      console.log('POST ', picture)
      return picture
    })
    .catch(function (err) {
      console.log('ERR: ', err.message)
      return err
    })
}

exports.deleteAll = function () {
  return Pictures.remove()
    .then(function () {
      console.log('DELETE /pictures')
    })
    .catch(function (err) {
      console.log('ERR: ', err.message)
      throw err
    })
}

function getFormedQuery (query) {
  var formedQuery = {}

  for (var key in query) {
    formedQuery[key] = key === 'date'
      ? {$gte: query[key]} : query[key]
  }
  return formedQuery
}