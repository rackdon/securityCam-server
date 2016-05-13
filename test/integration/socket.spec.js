var io = require('socket.io-client')
var fs = require('mz/fs')
var fileSystem = require('../../src/utils/fileSystem')
var picturesDao = require('../../src/dao/controllers/pictures')
var utils = require('../utils/commonUtils')

describe('In socket.js', function () {
  var socketURL = 'http://0.0.0.0:8082'
  var testFolder = './test/testFiles/'
  var client
  var maxWait = 10
  var maxRetries = 100
  var options = {
    transports: ['websocket'],
    'force new connection': true
  }

  afterEach(function (done) {
    client.disconnect()
    picturesDao.deleteAll()
      .should.be.eventually.fulfilled
      .then(function () {
        return fileSystem.deleteFiles(testFolder)
          .should.be.eventually.fulfilled
      })
      .should.notify(done)
  })

  it('a client can connect to the socket if the url is correct', function (done) {
    client = io.connect(socketURL, options)

    client.on('connect', function () {
      expect(client.connected).to.be.equals(true)
      done()
    })
  })

  it('a client can not connect to the socket if the url is incorrect', function (done) {
    var invalidSocketURL = 'incorrect'
    client = io.connect(invalidSocketURL, options)

    client.on('connect_error', function () {
      expect(client.connected).to.be.equals(false)
      done()
    })
  })

  it('a motion detected event is emited when a valid file is added in the observed folder', function (done) {
    var filePath
    var fileName = '1234-motion.png'

    var spyFunc = sinon.spy(function (path) {
      filePath = path
    })

    client = io.connect(socketURL, options)
    client.on('Motion detected', spyFunc)

    fs.writeFile(testFolder + fileName)

    utils.retry(function () {
      if (filePath) {
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    }, maxRetries, maxWait)
      .should.be.eventually.fulfilled
      .then(function () {
        expect(spyFunc.callCount).to.be.equal(1)
        expect(spyFunc.calledWith(filePath)).to.be.equal(true)

        return picturesDao.getPicture({date: fileName.split('-')[0]})
          .should.be.eventually.fulfilled
      })
      .then(function (picture) {
        expect(picture).to.have.property('name', filePath)
        expect(picture).to.have.property('type', 'motion')
        expect(picture).to.have.property('date', fileName.split('-')[0])
      })
      .should.notify(done)
  })

  it('two motion detected events are emited when two valid files are added in the observed folder', function (done) {
    var fileName1 = '1234-snapshot.png'
    var fileName2 = '4321-motion.png'

    var spyFunc = sinon.spy(function () {})

    client = io.connect(socketURL, options)
    client.on('Motion detected', spyFunc)

    fs.writeFile(testFolder + fileName1)
    fs.writeFile(testFolder + fileName2)

    utils.retry(function () {
      if (spyFunc.callCount === 2) {
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    }, maxRetries, maxWait)
      .should.be.eventually.fulfilled
      .then(function () {
        expect(spyFunc.callCount).to.be.equal(2)

        return picturesDao.getPictures({})
          .should.be.eventually.fulfilled
      })
      .then(function (pictures) {
        expect(pictures.length).to.be.equal(2)
      })
      .should.notify(done)
  })

  it('an invalid picture event is emited if the file added in the folder has not a valid name', function (done) {
    var invalidFileName = 'socket-invalid.png'
    var errorMessage

    var spyFunc = sinon.spy(function (error) {
      errorMessage = error
    })

    client = io.connect(socketURL, options)
    client.on('Invalid picture', spyFunc)

    fs.writeFile(testFolder + invalidFileName)

    utils.retry(function () {
      if (errorMessage) {
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    }, maxRetries, maxWait)
      .should.be.eventually.fulfilled
      .then(function () {
        expect(spyFunc.callCount).to.be.equal(1)
        expect(spyFunc.calledWith(errorMessage)).to.be.equal(true)

        return picturesDao.getPicture({name: testFolder + invalidFileName})
          .should.be.eventually.fulfilled
      })
      .then(function (response) {
        expect(response).to.be.equal(null)
      })
      .should.notify(done)
  })
})
