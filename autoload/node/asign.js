var net = require('net');
var fs = require('fs');
var logger = require('./log');
var sock = process.argv[2];
var netbeans = require("vim-netbeans");
logger.info(sock);

var sock_server = net.createServer(function(c) { //'connection' listener
  c.on('end', function() {
  });
  c.on('data', function(data) {
    var command = data.toString().replace(/(\r\n|\n|\r)/gm,"");
    if (command == "stop") {
      logger.info(command);
      process.exit(0);
    }
  });
  c.on('error', function(error) {
  });
});

sock_server.listen(sock, function() {
  logger.info("sock_server started");
});

process.on('SIGTERM', function() {
  process.exit(0);
});

logger.info("socket done");

var star = new netbeans.AnnotationType({
  name: "star",
  tooltip: "adsf",
  glyph: "*",
  fg: 4,
  bg: 6
});

var vim_server = new netbeans.VimServer({
});

vim_server.on("clientAuthed", function (vim) {
  logger.info("connected");
  vim.on("newBuffer", function (buffer) {
    logger.info("Editing " + buffer.pathname);
    buffer.startDocumentListen();
    buffer.on("save", function() {
      logger.info("Saving " + this.pathname);
    });
  });

  vim.key("C-a", function (buffer, offset, lnum, col) {
    logger.info("Starring a line");
    buffer.addAnno(star, offset);
  });
});

vim_server.listen(function () {
  logger.info("vim_server started.");
});

logger.info("netbeans done");
