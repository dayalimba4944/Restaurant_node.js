const express = require('express');
const router = express.Router();
const path = require('path');

// Define your routes
router.get('/', (req, res) => {
    // Get the absolute path to the HTML file
    const filePath = path.join(__dirname, '../resources/Restaurantly/index.html');
    
    // Send the HTML file
    res.sendFile(filePath);
});

// Export the router
module.exports = router;
