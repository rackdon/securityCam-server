var PicturesCtrl = require('../dao/controllers/pictures')
var queryBuilder = require('../dao/request-params/query-builder')
var fileSystem = require('../utils/fileSystem')
var fs = require('fs')
var mime = require('mime')

module.exports = function setup (app) {
  // TODO check if it is possible
  app.get('/pictures', function (req, res) {
    PicturesCtrl.getPictures(req.query)
      .then(function (picture) {
        res.set('Content-Type', mime.lookup(picture.name))
        return fs.createReadStream(picture.name).pipe(res)
      })
      .catch(function (err) {
        return res.status(500).send(err.message)
      })
  })

  app.get('/pictures/picture', function (req, res) {
    var query = queryBuilder.getQuery(req.query)
    PicturesCtrl.getPicture(query)
      .then(function (picture) {
        if (!picture) {
          return res.status(200).end()
        }
        res.set('Content-Type', mime.lookup(picture.name))
        return fs.createReadStream(picture.name).pipe(res)
      })
      .catch(function (err) {
        return res.status(500).send(err.message)
      })
  })

  app.delete('/pictures', function (req, res) {
    var folder = app.get('configuration').watchFolder

    PicturesCtrl.deleteAll()
      .then(function () {
        fileSystem.deleteFiles(folder)
      })
      .then(function () {
        return res.status(200).end()
      })
      .catch(function (err) {
        return res.status(500).send(err.message)
      })
  })
}
