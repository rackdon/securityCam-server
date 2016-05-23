var fs = require('mz/fs')
var model = require('../../../src/dao/models/pictures')
var fileSystem = require('../../../src/utils/fileSystem')
var modelMock

describe('In routes pictures.js', function () {
  var sandbox
  var picture1 = {
    _doc: {
      name: 'test1',
      type: 'motion',
      date: '123456'
    }
  }

  var picture2 = {
    _doc: {
      name: 'test2',
      type: 'periodic',
      date: '654321'
    }
  }

  var pictureError = {
    message: 'ErrorMessage'
  }

  before(function () {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(function () {
    modelMock = sandbox.mock(model)
  })
  afterEach(function () {
    sandbox.restore()
  })

  it.skip('GET /pictures returns all pictures', function (done) {
    modelMock
      .expects('find')
      .chain('exec')
      .resolves([picture1, picture2])

    request(serverTest).get('/pictures')
      .expect(200)
      .end(function (err, response) {
        expect(response).to.have.property('body')
        expect(response.body[0]).to.be.deep.equal(picture1._doc)
        expect(response.body[1]).to.be.deep.equal(picture2._doc)
        done(err)
      })
  })

  it('GET /pictures returns an error', function (done) {
    modelMock
      .expects('find')
      .chain('exec')
      .rejects(pictureError)

    request(serverTest).get('/pictures')
      .expect(500)
      .should.be.eventually.fulfilled
      .then(function (response) {
        expect(response).to.have.deep.property('error.text', 'ErrorMessage')
      })
      .should.notify(done)
  })

  it('GET /pictures/picture returns a picture', function (done) {
    var imageData
    var query = {
      date: {
        $gte: '9999'
      }
    }

    modelMock
      .expects('findOne')
      .withExactArgs(query)
      .chain('exec')
      .resolves({
        _doc: {
          name: './test/testImages/9999-motion.png',
          type: 'motion',
          date: '9999'
        }
      })

    fs.readFile('./test/testImages/9999-motion.png')
      .should.be.eventually.fulfilled
      .then(function (data) {
        imageData = data

        return request(serverTest).get('/pictures/picture?minDate=9999')
          .expect(200)
          .should.be.eventually.fulfilled
      })
      .then(function (response) {
        expect(response).to.have.property('body')
        expect(response.body).to.be.deep.equal(imageData)
      })
      .should.notify(done)
  })

  it('GET /pictures/picture returns empty body if there is no picture', function (done) {
    modelMock
      .expects('findOne')
      .chain('exec')
      .resolves({})

    request(serverTest).get('/pictures/picture?name=nonExistent')
      .expect(200)
      .should.be.eventually.fulfilled
      .then(function (response) {
        expect(response).to.have.property('body').and.to.be.deep.equal({})
      })
      .should.notify(done)
  })

  it('GET /pictures/picture returns an error', function (done) {
    modelMock
      .expects('findOne')
      .chain('exec')
      .rejects(pictureError)

    request(serverTest).get('/pictures/picture')
      .expect(500)
      .should.be.eventually.fulfilled
      .then(function (response) {
        expect(response).to.have.deep.property('error.text', 'ErrorMessage')
      })
      .should.notify(done)
  })

  it('DELETE /pictures returns status 200', function (done) {
    var deleteFilesMock = sandbox.mock(fileSystem)
      .expects('deleteFiles')
      .once()

    modelMock
      .expects('remove')
      .resolves()

    request(serverTest).delete('/pictures')
      .expect(200)
      .should.be.eventually.fulfilled
      .then(function () {
        deleteFilesMock.verify()
      })
      .should.notify(done)
  })

  it('DELETE /pictures returns an error', function (done) {
    var deleteFilesMock = sandbox.mock(fileSystem)
      .expects('deleteFiles')
      .never()

    modelMock
      .expects('remove')
      .rejects(pictureError)

    request(serverTest).delete('/pictures')
      .expect(500)
      .should.be.eventually.fulfilled
      .then(function (response) {
        expect(response).to.have.deep.property('error.text', 'ErrorMessage')
        deleteFilesMock.verify()
      })
      .should.notify(done)
  })
})
