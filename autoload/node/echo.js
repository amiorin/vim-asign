var net = require('net');
var fs = require('fs');
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });
  c.on('data', function(data) {
    console.log(data.toString());
  });
  c.on('error', function(error) {
    console.log(error);
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen('/tmp/echo.sock', function() {
  console.log('server bound');
});
process.on('SIGTERM', function() {
  console.log('exit');
  fs.unlinkSync('/tmp/echo.sock');
  process.exit(0);
});
