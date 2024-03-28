// app.js
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer middleware

const app = express();

// Middleware for parsing application/json
app.use(bodyParser.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing multipart/form-data
const upload = multer();
app.use(upload.none());

// Routes
const apiRouter = require('./route/api');
app.use('/api', apiRouter);

const webRouter = require('./route/web');
app.use('/', webRouter);
// 404 Error handler
app.use((req, res) => {
    res.status(404).send('404 - Route not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 - Internal Server Error');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
