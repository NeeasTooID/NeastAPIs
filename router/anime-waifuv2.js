const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
    // Lakukan HTTP request untuk mengunduh gambar dari URL
    const imageUrl = "https://datanst.zanixon.xyz/random-waifuv2";
    const requestSettings = {
        url: imageUrl,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Mengirimkan gambar sebagai respons
            res.set('Content-Type', 'image/jpeg'); // Set jenis konten sebagai gambar JPEG
            res.send(body);
        } else {
            res.status(500).json({ error: 'Gagal mengambil gambar' });
        }
    });
});

module.exports = router;
