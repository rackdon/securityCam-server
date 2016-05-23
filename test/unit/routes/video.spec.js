describe('In routes video.js', function () {
  it('an error is returned if motion server is off', function (done) {
    request(serverTest)
      .get('/video/motion')
      .expect(500)
      .end(function (err, response) {
        expect(response).to.have.deep.property('error.text', 'connect ECONNREFUSED 127.0.0.1:8081')
        done(err)
      })
  })
})
