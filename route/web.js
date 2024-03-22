const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, '../resources')));

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../resources/Restaurantly/index.html');
    res.sendFile(filePath);
});

router.use(express.static(path.join(__dirname, '../resources')));

router.get('/AdminPanel', (req, res) => {
    const filePath = path.join(__dirname, '../resources/AdminPanel/index.html');
    res.sendFile(filePath);
});

module.exports = router;
