var utils = require('../../src/utils/commonUtils')

describe('In commonUtils.js', function () {
  it('the type of the snapshot can be determined (periodic)', function () {
    var name = '123456-snapshot.png'
    expect(utils.evaluateSnapshotType(name)).to.be.equals('periodic')
  })

  it('the type of the snapshot can be determined (motion)', function () {
    var name = '123456-motion.png'
    expect(utils.evaluateSnapshotType(name)).to.be.equals('motion')
  })

  it('the type of the snapshot can not be determined (unknown)', function () {
    var name = '123456.png'
    expect(utils.evaluateSnapshotType(name)).to.be.equals('unknown')
  })

  it('the date of the snapshot can be retrieved', function () {
    var name = 'test/testFiles/123456-motion.png'
    expect(utils.getSnapshotDate(name)).to.be.equals('123456')
  })

  it('the date of the snapshot can be retrieved if there are only numbers', function () {
    var name = 'test/testFiles/123456.png'
    expect(utils.getSnapshotDate(name)).to.be.equals('123456')
  })
})
