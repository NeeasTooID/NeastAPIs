const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio'); // Import cheerio library

router.get('/', (req, res) => {
    // Lakukan HTTP request untuk mengunduh halaman HTML
    const pageUrl = "https://datanst.zanixon.xyz/random-waifuv2"; // Ganti <URL_Router> dengan URL router Anda

    request(pageUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Mem-parsing halaman HTML menggunakan cheerio
            const $ = cheerio.load(body);
            const imageUrl = $('img').attr('src'); // Mengambil atribut src dari tag img

            // Lakukan HTTP request untuk mengunduh gambar dari URL
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
        } else {
            res.status(500).json({ error: 'Gagal mengambil halaman HTML' });
        }
    });
});

module.exports = router;
