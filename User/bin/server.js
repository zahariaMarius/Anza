/**
 * Module dependencies.
 */
const conf = require('../conf/conf').serverConf;
const app = require('../app');
const http = require('http');
const moment = require('moment');
const tz = require('moment-timezone');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(conf.port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.log('===> Server is running on Port ' + port + ' <===');
});

server.on('connection', socket => {
  console.log('Connection Time: ' + moment().tz("Europe/Rome").format('MMMM Do YYYY, h:mm:ss a'));
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
