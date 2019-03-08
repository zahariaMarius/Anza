/**
 * Module dependencies.
 */
const conf = require('../configuration/conf').serverConf;
const app = require('../app');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(conf.port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app)
  .on('error', err => {
    console.log('Error while creating HTTP connection => ' + err);
  }).on('connection', socket => {
  });

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.log('===> Server is running on Port ' + port + ' <===');
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
