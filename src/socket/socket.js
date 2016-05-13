var fileSystem = require('../utils/fileSystem')
var commonUtils = require('../utils/commonUtils')
var PicturesCtrl = require('../dao/controllers/pictures')

module.exports = function setup (app, io) {
  var watchFolder = app.get('configuration').watchFolder

  io.on('connection', function (socket) {
    console.log('A user connected')
  })

  fileSystem.watch(watchFolder, function (path) {
    console.log('New File: ' + path)
    var snapshotType = commonUtils.evaluateSnapshotType(path)
    var snapshotDate = commonUtils.getSnapshotDate(path)

    return PicturesCtrl.addPicture({
      name: path,
      type: snapshotType,
      date: snapshotDate
    })
      .then(function () {
        io.sockets.emit('Motion detected', path)
      })
      .catch(function (err) {
        io.sockets.emit('Invalid picture', err.message)
      })
  })
}
