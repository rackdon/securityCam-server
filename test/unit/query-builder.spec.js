var queryBuilder = require('../../src/dao/request-params/query-builder')

describe('In query-builder.js', function () {
  it('the query formed is empty if there is no query in the request', function () {
    expect(queryBuilder.getQuery()).to.be.deep.equals({})
  })

  it('the query formed contains all fields of the request', function () {
    var requestQuery = {
      test: 1234,
      test2: 'asdf'
    }
    expect(queryBuilder.getQuery(requestQuery)).to.be.deep.equals(requestQuery)
  })

  it('the query formed contains date parsed field', function () {
    var requestQuery = {
      test: 1234,
      minDate: 123456
    }
    var formedQuery = {
      test: 1234,
      date: {
        $gte: 123456
      }
    }
    expect(queryBuilder.getQuery(requestQuery)).to.be.deep.equals(formedQuery)
  })
})
