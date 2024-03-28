// api.js
const express = require('express');
const router = express.Router();

// Import the controllers
const MenuController = require('../controllers/api/MenuController');
const MenuCategoriesController = require('../controllers/api/MenuCategoriesController');
const ChefsController = require('../controllers/api/ChefsController');
const EventsController = require('../controllers/api/EventsController');
const ContactUsController = require('../controllers/api/ContactUsController');
const GalleryController = require('../controllers/api/GalleryController');

// const MenuController = require('./web');

// Menu Categories routes
router.get("/menuCategories", MenuCategoriesController.index);
router.post("/menuCategories", MenuCategoriesController.store);
router.post("/menuCategories-update", MenuCategoriesController.update);
router.delete("/menuCategories/:id", MenuCategoriesController.delete);

// Menu routes
router.get("/menu", MenuController.index);
router.post("/menu", MenuController.store);
router.post("/menu-update", MenuController.update);
router.delete("/menu/:id", MenuController.delete);

// Chefs routes
router.get("/chefs", ChefsController.index);
router.post("/chefs", ChefsController.store);
router.post("/chefs-update", ChefsController.update);
router.delete("/chefs/:id", ChefsController.delete);

// Events routes
router.get("/events", EventsController.index);
router.post("/events", EventsController.store);
router.post("/events-update", EventsController.update);
router.delete("/events/:id", EventsController.delete);

// gallery routes
router.get("/gallery", GalleryController.index);
router.post("/gallery", GalleryController.store);
router.post("/gallery-update", GalleryController.update);
router.delete("/gallery/:id", GalleryController.delete);

// contactUs routes
router.get("/contactUs", ContactUsController.index);
router.post("/contactUs", ContactUsController.update);
router.post("/contactUs-update", ContactUsController.update);

// 404 error handler
router.use((req, res) => {
    res.status(404).send('404 - Route not found');
});

// Export the router
module.exports = router;
