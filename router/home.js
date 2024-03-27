const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware untuk menangani permintaan GET ke /donate
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/Dll', 'home.html'));
});

module.exports = router;
