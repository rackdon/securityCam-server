var functions = {}

functions.evaluateSnapshotType = function (name) {
  var splittedName = name.split('-')
  var type = splittedName[splittedName.length - 1].split('.')[0]

  return type === 'motion' ? type : type === 'snapshot' ? 'periodic' : 'unknown'
}

functions.getSnapshotDate = function (name) {
  var splittedData = name.split('.')[0].split('-')[0].split('/')
  return splittedData[splittedData.length - 1]
}

module.exports = functions
