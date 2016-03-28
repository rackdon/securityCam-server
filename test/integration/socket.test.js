var io = require('socket.io-client')
var stdout = require('test-console').stdout

describe('In socket.js', function () {
  var options = {
    transports: ['websocket'],
    'force new connection': true
  }

  it('A client can connect to the socket if the url is correct', function (done) {
    var socketURL = 'http://0.0.0.0:8082'
    var restore = stdout.ignore()
    var client = io.connect(socketURL, options)

    client.on('connect', function () {
      expect(client.connected).to.be.equals(true)
      restore()
      done()
    })
  })

  it('A client can not connect to the socket if the url is incorrect', function (done) {
    var socketURL = 'incorrect'
    var restore = stdout.ignore()
    var client = io.connect(socketURL, options)

    client.on('connect_error', function () {
      expect(client.connected).to.be.equals(false)
      restore()
      done()
    })
  })
})
