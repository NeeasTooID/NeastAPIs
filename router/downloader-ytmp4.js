const express = require('express');
const router = express.Router();
const { youtubedl } = require('@bochilteam/scraper-sosmed');

router.get('/:url', async (req, res) => {
    try {
        // Ekstrak URL YouTube dari parameter URL
        const videoUrl = req.params.url.split('/').pop();
        const data = await youtubedl(`https://youtu.be/${videoUrl}`);
        
        // Ambil video stream dari data
        const videoStream = await data.video['720p'].stream();
        
        // Set header untuk memberitahu browser bahwa ini adalah video
        res.setHeader('Content-Type', 'video/mp4');
        
        // Alirkan video stream ke respons
        videoStream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
