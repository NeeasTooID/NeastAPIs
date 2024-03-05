const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        // Lakukan HTTP request untuk mengunduh gambar dari URL
        const imageUrl = "https://datanst.zanixon.xyz/random-waifuv2";
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Mengirimkan gambar sebagai respons
        res.set('Content-Type', 'image/jpeg'); // Set jenis konten sebagai gambar JPEG
        res.send(Buffer.from(response.data, 'binary'));
    } catch (error) {
        console.error('Gagal mengambil gambar:', error.message);
        res.status(500).json({ error: 'Gagal mengambil gambar' });
    }
});

module.exports = router;
