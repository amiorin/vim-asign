var net = require('net');
var fs = require('fs');
var sock = process.argv[2];

var server = net.createServer(function(c) { //'connection' listener
  c.on('end', function() {
  });
  c.on('data', function(data) {
    var command = data.toString().replace(/(\r\n|\n|\r)/gm,"");
    if (command == "stop") {
      fs.unlinkSync(sock);
      process.exit(0);
    }
  });
  c.on('error', function(error) {
  });
});

server.listen(sock, function() {
});

process.on('SIGTERM', function() {
  fs.unlinkSync(sock);
  process.exit(0);
});
