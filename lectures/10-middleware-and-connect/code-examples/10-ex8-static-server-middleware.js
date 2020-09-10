const connect = require('connect');
const http = require('http');

const app = connect();

const serveStatic = require('serve-static');
app.use(serveStatic("public"));

const server = http.createServer(app);
server.listen(3000);
console.log('server running on http://localhost:3000');