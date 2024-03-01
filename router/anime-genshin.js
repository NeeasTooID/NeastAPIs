const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware untuk menangani permintaan GET
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../database/anime', 'genshin.html'));
});

module.exports = router;
