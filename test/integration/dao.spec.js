var controller = require('../../src/dao/controllers/pictures')

describe('In dao', function () {
  var data1 = {
    name: '1234-motion.png',
    type: 'motion',
    date: '1234'
  }

  var data2 = {
    name: '4321-snapshot.png',
    type: 'periodic',
    date: '4321'
  }

  describe('adding pictures', function () {
    afterEach(function (done) {
      controller.deleteAll()
        .should.be.eventually.fulfilled.and.notify(done)
    })

    it('a picture can be added', function (done) {
      controller.addPicture(data1)
        .should.be.eventually.fulfilled
        .then(function (response) {
          expect(response).to.have.property('_id')
          expect(response).to.have.property('name', data1.name)
          expect(response).to.have.property('type', data1.type)
          expect(response).to.have.property('date', data1.date)
        })
        .should.notify(done)
    })

    it('an error is returned if the data fields are invalid', function (done) {
      controller
        .addPicture()
        .should.be.eventually.rejected
        .then(function (error) {
          expect(error.message).to.contain('validation failed')
        })
        .should.notify(done)
    })
  })

  describe('getting pictures', function () {
    beforeEach(function (done) {
      controller.addPicture(data1)
        .should.be.eventually.fulfilled
        .then(function () {
          return controller.addPicture(data2)
            .should.be.eventually.fulfilled
        })
        .should.notify(done)
    })

    afterEach(function (done) {
      controller.deleteAll()
        .should.be.eventually.fulfilled.and.notify(done)
    })

    it('a picture can be gotten through his name', function (done) {
      controller.getPicture({name: data2.name})
        .should.be.eventually.fulfilled
        .then(function (response) {
          expect(response).to.be.deep.equal(data2)
        })
        .should.notify(done)
    })

    it('a picture can be gotten through his date', function (done) {
      controller.getPicture({date: data2.date - 10})
        .should.be.eventually.fulfilled
        .then(function (response) {
          expect(response).to.be.deep.equal(data2)
        })
        .should.notify(done)
    })

    it('a picture can be gotten through his date and his type', function (done) {
      controller.getPicture({date: data2.date - 10, type: 'periodic'})
        .should.be.eventually.fulfilled
        .then(function (response) {
          expect(response).to.be.deep.equal(data2)
        })
        .should.notify(done)
    })

    it('no data are received if the documment does not exists', function (done) {
      controller.getPicture({name: 'nonExistent'})
        .should.be.eventually.fulfilled
        .then(function (response) {
          expect(response).to.be.equal(null)
        })
        .should.notify(done)
    })

    it('all pictures can be gotten', function (done) {
      controller.getPictures({})
        .should.be.eventually.fulfilled
        .then(function (response) {
          expect(response[0]).to.be.deep.equal(data1)
          expect(response[1]).to.be.deep.equal(data2)
        })
        .should.notify(done)
    })
  })

  describe('deleting pictures', function () {
    beforeEach(function (done) {
      controller.addPicture(data1)
        .should.be.eventually.fulfilled
        .then(function () {
          return controller.addPicture(data2)
            .should.be.eventually.fulfilled
        })
        .should.notify(done)
    })

    it('all pictures can be deleted', function (done) {
      controller.deleteAll()
        .should.be.eventually.fulfilled
        .then(function (response) {
          return controller.getPictures({})
            .should.be.eventually.fulfilled
        })
        .then(function (response) {
          expect(response).to.be.deep.equal([])
        })
        .should.notify(done)
    })
  })
})
