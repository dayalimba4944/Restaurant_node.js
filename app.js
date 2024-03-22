const express = require('express');
const http = require('http');

// Import the router from web.js and api.js
const webRouter = require('./route/web');
const apiRouter = require('./route/api');

const app = express();
app.use(express.static('public'));

// Use the routers in your main app
app.use('/', webRouter);
app.use('/api', apiRouter);

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Define the hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Start the server and listen for incoming requests
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
