var utils = {}

utils.timeOut = function (func, milis) {
  return new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(func)
    }, milis)
  })
}

utils.retry = function (retryFunction, maxRetries, retryPeriod, catches) {
  return new Promise(function (resolve, reject) {
    catches = catches || []

    if (maxRetries < 1) {
      reject(catches)
    } else {
      retryFunction()
        .then(function (response) {
          resolve(response)
        })
        .catch(function (err) {
          catches.push(err)
          setTimeout(function () {
            utils.retry(retryFunction, maxRetries - 1, retryPeriod, catches)
              .then(resolve).catch(reject)
          }, retryPeriod)
        })
    }
  })
}

module.exports = utils
