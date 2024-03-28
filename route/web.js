const express = require('express');
const router = express.Router();
const path = require('path');

// Serve static files from the 'resources' directory
router.use(express.static(path.join(__dirname, '../resources')));

// Serve static files from the 'public/assets' directory under '/assets' route
router.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Route for serving the main HTML file
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../resources/Restaurantly/index.html');
    res.sendFile(filePath);
});

// Route for serving the AdminPanel HTML file
router.get('/AdminPanel', (req, res) => {
    const filePath = path.join(__dirname, '../resources/AdminPanel/index.html');
    res.sendFile(filePath);
});

module.exports = router;
