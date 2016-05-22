var functions = {}

functions.getQuery = function (params) {
  var query = {}
  for (var key in params) {
    key === 'minDate'
      ? query.date = {$gte: params[key]} : query[key] = params[key]
  }
  return query
}

module.exports = functions
