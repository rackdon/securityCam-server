module.exports = function setup (io) {
  io.on('connection', function (socket) {
    console.log('A user connected')
  })
}
