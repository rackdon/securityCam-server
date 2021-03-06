var fileSystem = require('../utils/fileSystem')
var commonUtils = require('../utils/commonUtils')
var PicturesCtrl = require('../dao/controllers/pictures')
var log = require('../log/log').getLog('SOCKET')

module.exports = function setup (app, io) {
  var watchFolder = app.get('configuration').watchFolder

  io.on('connection', function (socket) {
    log.info('A user connected')
    socket.on('disconnect', function () {
      log.info('A user disconnected')
    })
  })

  io.on('disconnected', function () {
    log.info('A user disconnected')
  })

  fileSystem.watch(watchFolder, function (path) {
    log.info('New File: ' + path)
    var snapshotType = commonUtils.evaluateSnapshotType(path)
    var snapshotDate = commonUtils.getSnapshotDate(path)

    return PicturesCtrl.addPicture({
      name: path,
      type: snapshotType,
      date: snapshotDate
    })
      .then(function () {
        if (snapshotType === 'motion') {
          io.sockets.emit('Motion detected', path)
          log.info('Motion event emmited')
        }
      })
      .catch(function (err) {
        io.sockets.emit('Invalid picture', err.message)
        log.info('Invalid picture event emmited')
      })
  })
}
