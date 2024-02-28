const express = require('express');
const router = express.Router();
const { youtubedl } = require('@bochilteam/scraper-sosmed');

router.get('/', (req, res) => {
    res.status(400).json({ error: 'Silakan masukkan ID YouTube setelah /downloader-ytmp4/' });
});

router.get('/:url', async (req, res) => {
    try {
        // Ekstrak URL YouTube dari parameter URL
        const videoId = req.params.url.split('/').pop();
        
        // Jika URL YouTube kosong, kirim pesan kesalahan
        if (!videoId) {
            throw new Error('ID YouTube tidak ditemukan');
        }
        
        const data = await youtubedl(`https://youtu.be/${videoId}`);
        
        // Kirim data yang diterima dari youtubedl sebagai respons JSON
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
