const express = require('express');
const http = require('http');

const app = express();

const webRouter = require('./route/web');
const apiRouter = require('./route/api');

app.use(express.static('public'));

app.use('/', webRouter);
app.use('/api', apiRouter);

const server = http.createServer(app);

const hostname = '127.0.0.1';
const port = 3000;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
