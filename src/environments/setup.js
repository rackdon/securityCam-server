module.exports = function setEnv (env) {
  if (env === 'production') {
    return require('./production.js')
  } else {
    return require('./development.js')
  }
}
