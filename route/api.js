const express = require('express');
const router = express.Router();

// Import the controllers
const homeController = require('../controllers/homeController');
const AuthController = require('../controllers/AuthController');

// Define route handlers for /home and /login using the controllers
router.get("/home", homeController.homePage);
router.get("/login", AuthController.homePage);

// Define a middleware for handling 404 errors
router.use((req, res) => {
    res.status(404).send('404 - Route not found');
});

// Export the router
module.exports = router;