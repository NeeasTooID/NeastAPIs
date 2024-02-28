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
        
        const data = await youtubedl(`${videoId}`);
        
        // Periksa jika video dengan resolusi '720p' tersedia
        if (!data.video['720p']) {
            throw new Error('Video not available in 720p resolution');
        }
        
        // Ambil URL video dari data
        const videoUrl = data.video['720p'].url;
        
        // Set header untuk memberitahu browser bahwa ini adalah video
        res.setHeader('Content-Type', 'video/mp4');
        
        // Redirect ke URL video
        res.redirect(videoUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
