const connect = require('connect');
const http = require('http');

// Create a connect dispatcher
const app = connect();

const serveIndex = require('serve-index')
const serveStatic = require('serve-static');
app.use(serveIndex("library"));
app.use(serveStatic("library"));

const server = http.createServer(app);
//Start the server
server.listen(3000);
console.log('server running on http://localhost:3000');