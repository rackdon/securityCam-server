var net = require('net')
var fs = require('fs')
var clients = []
var host = '0.0.0.0'
var port = 8082
var server = net.createServer(function (socket) {
  socket.on('data', callback)
  socket.on('end', function () {
    console.dir('End callback')
    clients.splice(clients.indexOf(socket), 1)
  })
  clients.push(socket)
})

server.listen(port, host)
console.log('server started')

var callback = function (data) {
  for (var i = 0; i < clients.length; i++) {
    var socket = clients[i]
    socket.write(data.toString() + '\n')
  }
}

fs.watch('/home/pi/motion/captures', function (eventType, file) {
  //fs.exists(file, function (exists) {
    //if (exists) {
      //callback('Change')
    //}
  //})
  callback('Change')
  console.log('A file has been changed')
  console.dir(eventType)
  console.dir(file)
})
