var fileSystem = require('../../src/utils/fileSystem')
var fs = require('mz/fs')
var utils = require('../utils/commonUtils')

describe('In fileSystem.js', function () {
  var testFolder = 'test/testFiles/'
  var maxWait = 10
  var maxRetries = 100

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
