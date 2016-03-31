var fileSystem = require('../../src/utils/fileSystem.js')
var fs = require('mz/fs')
var utils = require('../utils/commonUtils.js')

describe('In fileSystem.js', function () {
  var testFolder = './test/files/'

  before(function (done) {
    fs.exists(testFolder)
      .should.be.eventually.fulfilled
      .then(function (exists) {
        if (!exists) {
          fs.mkdir(testFolder)
        }
      })
      .should.be.eventually.fulfilled.and.notify(done)
  })

  after(function (done) {
    fs.exists(testFolder)
      .should.be.eventually.fulfilled
      .then(function (exists) {
        if (exists) {
          fs.rmdir(testFolder)
        }
      })
      .should.be.eventually.fulfilled.and.notify(done)
  })

  it('the path of the file is received when this is created', function (done) {
    var filePath
    var testFunction = sinon.spy(function (path, stats) {
      filePath = path
    })

    fileSystem.watch(testFunction, testFolder)

    fs.writeFile(testFolder + 'test.png', '')
      .should.be.eventually.fulfilled
      .then(function () {
        return utils.timeOut(function () {
          expect(testFunction.callCount).to.be.equal(1)
          expect(filePath).to.be.equal(testFolder + 'test.png')
        }, 10)
          .should.be.eventually.fulfilled
      })
      .then(function () {
        return fileSystem.deleteFiles(testFolder)
          .should.be.eventually.fulfilled
      })
      .should.notify(done)
  })

  it('all files are deleted from a folder', function (done) {
    fs.writeFile(testFolder + 'test.png', '')
      .should.be.eventually.fulfilled
      .then(function () {
        return fs.writeFile(testFolder + 'test2.png', '')
          .should.be.eventually.fulfilled
      })
      .then(function () {
        return fs.readdir(testFolder)
          .should.be.eventually.fulfilled
      })
      .then(function (files) {
        expect(files.length).to.be.equal(2)

        return fileSystem.deleteFiles(testFolder)
          .should.be.eventually.fulfilled
      })
      .then(function () {
        return new Promise(function (resolve, reject) {
          return setTimeout(function () {
            return resolve(fs.readdir(testFolder))
          }, 10)
        })
          .should.be.eventually.fulfilled
      })
      .then(function (files) {
        expect(files.length).to.be.equal(0)
      })
      .should.notify(done)
  })

  it('all files are deleted from a folder recursively', function (done) {
    var secondFolder = testFolder + 'secondFolder/'

    fs.writeFile(testFolder + 'test.png', '')
      .should.be.eventually.fulfilled
      .then(function () {
        return fs.mkdir(secondFolder)
          .should.be.eventually.fulfilled
      })
      .then(function () {
        return fs.writeFile(secondFolder + 'test2.png', '')
          .should.be.eventually.fulfilled
      })
      .then(function () {
        return fs.readdir(testFolder)
          .should.be.eventually.fulfilled
      })
      .then(function (files) {
        expect(files.length).to.be.equal(2)

        return fs.readdir(secondFolder)
          .should.be.eventually.fulfilled
      })
      .then(function (files) {
        expect(files.length).to.be.equal(1)

        return fileSystem.deleteFiles(testFolder)
          .should.be.eventually.fulfilled
      })
      .then(function () {
        return new Promise(function (resolve, reject) {
          return setTimeout(function () {
            return resolve(fs.readdir(testFolder))
          }, 10)
        })
          .should.be.eventually.fulfilled
      })
      .then(function (files) {
        expect(files.length).to.be.equal(1)

        return new Promise(function (resolve, reject) {
          return setTimeout(function () {
            return resolve(fs.readdir(secondFolder))
          }, 10)
        })
          .should.be.eventually.fulfilled
      })
      .then(function (files) {
        expect(files.length).to.be.equal(0)

        return fs.rmdir(secondFolder)
          .should.be.eventually.fulfilled
      })
      .should.notify(done)
  })
})
