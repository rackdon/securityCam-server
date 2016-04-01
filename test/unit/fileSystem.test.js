var fileSystem = require('../../src/utils/fileSystem.js')
var fs = require('mz/fs')
var utils = require('../utils/commonUtils.js')
var stdout = require('test-console').stdout

describe('In fileSystem.js', function () {
  var testFolder = 'test/testFiles/'
  var maxWait = 10
  var maxRetries = 100

  it('the path of the file is received when this is created', function (done) {
    var filePath
    var restore = stdout.ignore()
    var testFunction = sinon.spy(function (path, stats) {
      filePath = path
    })

    fileSystem.watch(testFunction, testFolder)

    fs.writeFile(testFolder + 'test.png', '')
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
        expect(testFunction.callCount).to.be.equal(1)
        expect(filePath).to.be.equal(testFolder + 'test.png')
        restore()

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
        return utils.retry(function () {
          return fs.readdir(testFolder)
            .then(function (files) {
              if (files.length === 0) {
                return files
              } else {
                return Promise.reject()
              }
            })
        }, maxRetries, maxWait)
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
        return utils.retry(function () {
          return fs.readdir(testFolder)
            .then(function (files) {
              if (files.length === 1) {
                return files
              } else {
                return Promise.reject()
              }
            })
        }, maxRetries, maxWait)
          .should.be.eventually.fulfilled
      })
      .then(function (files) {
        expect(files.length).to.be.equal(1)

        return utils.retry(function () {
          return fs.readdir(secondFolder)
            .then(function (files) {
              if (files.length === 0) {
                return files
              } else {
                return Promise.reject()
              }
            })
        }, maxRetries, maxWait)
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
