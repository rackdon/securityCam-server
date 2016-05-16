var fs = require('mz/fs')
var chokidar = require('chokidar')
var log = require('../log/log').getLog('WATCHER')

var functions = {}

functions.watch = function (path, cb) {
  var dir = path || '/'
  var opts = {
    ignoreInitial: true
  }

  var watcher = chokidar.watch(dir, opts)
  log.info('Watching at ', dir)

  watcher
    .on('add', function (path, stats) {
      cb(path, stats)
    })
}

functions.deleteFiles = function (path) {
  var dir = path || '/home/pi/motion/captures/'

  return fs.exists(dir)
    .then(function (exists) {
      if (exists) {
        return fs.readdir(dir)
          .then(function (files) {
            return files.forEach(function (file) {
              var fullPath = dir + file
              return fs.lstat(fullPath)
                .then(function (stats) {
                  if (stats.isFile()) {
                    return fs.unlink(fullPath)
                  } else {
                    return functions.deleteFiles(fullPath + '/')
                  }
                })
            })
          })
      }
    })
}

module.exports = functions
