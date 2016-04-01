var fileSystem = require('../utils/fileSystem')

module.exports = function setup (app, io) {
  var watchFolder = app.get('configuration').watchFolder

  io.on('connection', function (socket) {
    console.log('A user connected')
  })

  fileSystem.watch(function (path) {
    io.sockets.emit('Motion detected', path)
  }, watchFolder)
}
