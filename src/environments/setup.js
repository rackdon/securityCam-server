module.exports = function setEnv (env) {
  if (env === 'production') {
    return require('./production')
  } else {
    return require('./development')
  }
}
