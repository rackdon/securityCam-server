var environmentSetup = require('../../src/environments/setup')

describe('In environments setup.js', function () {
  it('configuration variables are returned in production environment', function () {
    var configuration = environmentSetup('production')

    expect(configuration).to.have.property('watchFolder', '/home/motion/pictures/')
    expect(configuration).to.have.property('db', 'mongodb://localhost/pictures')
  })

  it('configuration variables are returned in development environment', function () {
    var configuration = environmentSetup('development')

    expect(configuration).to.have.property('watchFolder', 'test/testFiles/')
    expect(configuration).to.have.property('db', 'mongodb://localhost/test')
  })
})
