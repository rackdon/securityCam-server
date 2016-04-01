var io = require('socket.io-client')
var stdout = require('test-console').stdout
var fs = require('mz/fs')
var fileSystem = require('../../src/utils/fileSystem.js')
var utils = require('../utils/commonUtils.js')

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

  it('An event is emited when a file is added in the observed folder', function (done) {
    var maxWait = 10
    var maxRetries = 100
    var testFolder = './test/testFiles/'
    var socketURL = 'http://0.0.0.0:8082'
    var restore = stdout.ignore()
    var filePath
    var spyFunc = sinon.spy(function (path) {
      filePath = path
    })
    var client = io.connect(socketURL, options)
    client.on('Motion detected', spyFunc)

    fs.writeFile(testFolder + 'socket.png', '')
      .should.be.eventually.fulfilled
      .then(function () {
        return utils.retry(function () {
          if (filePath) {
            return Promise.resolve()
          } else {
            return Promise.reject()
          }
        }, maxRetries, maxWait)
          .should.be.eventually.fulfilled
      })
      .then(function () {
        expect(spyFunc.callCount).to.be.equal(1)
        expect(spyFunc.calledWith(filePath)).to.be.equal(true)
        restore()

        return fileSystem.deleteFiles(testFolder)
          .should.be.eventually.fulfilled
      })
      .should.notify(done)
  })
})
