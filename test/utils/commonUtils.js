var utils = {}

utils.timeOut = function (func, milis) {
  return new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(func)
    }, milis)
  })
}

module.exports = utils
