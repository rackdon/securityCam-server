describe('In server.js', function () {
  it('main route "/" can be gotten', function (done) {
    request(serverTest)
      .get('/')
      .expect(200)
      .end(function (err, response) {
        expect(response.text).to.be.equals('Security Cam express server')
        done(err)
      })
  })
})
