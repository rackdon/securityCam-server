var log4js = require('log4js')

var functions = {}

functions.getLog = function (type) {
  return log4js.getLogger(type)
}

module.exports = functions
