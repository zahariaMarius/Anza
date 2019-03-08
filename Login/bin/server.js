/**
 * Module dependencies.
 */
const app = require('../app');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(3000);
app.set('port', port);


/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.log('Server is running on Port: ' + port);

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
