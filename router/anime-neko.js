const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');
const path = require('path');

router.get('/', (req, res) => {
    const dataFilePath = path.join(__dirname, '..', 'apijson', 'anime', 'nekonime.json');
    try {
        const rawData = fs.readFileSync(dataFilePath);
        const data = JSON.parse(rawData);

        // Ambil URL gambar secara acak dari data JSON
        const randomIndex = Math.floor(Math.random() * data.length);
        const imageUrl = data[randomIndex];

        // Lakukan HTTP request untuk mengunduh gambar dari URL
        const requestSettings = {
            url: imageUrl,
            method: 'GET',
            encoding: null
        };
        request(requestSettings, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            } else {
                res.status(500).json({ error: 'Failed to fetch image' });
            }
        });
    } catch (error) {
        console.error('Failed to read data from JSON file:', error);
        res.status(500).json({ error: 'Failed to load image' });
    }
});

module.exports = router;
