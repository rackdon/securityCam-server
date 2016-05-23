var functions = {}

var dictionary = {
  minDate: function (query, value) {
    query.date = {$gte: value}
    return query
  }
}

functions.getQuery = function (params) {
  var query = {}
  for (var key in params) {
    dictionary[key] ? query = dictionary[key](query, params[key])
      : query[key] = params[key]
  }
  return query
}

module.exports = functions
