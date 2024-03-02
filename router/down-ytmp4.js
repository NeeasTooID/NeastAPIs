// routes.js
const express = require('express');
const { youtubedl } = require('@bochilteam/scraper-sosmed');

const router = express.Router();

router.get('/:videoId?', async (req, res) => {
    try {
        const { videoId } = req.params;
        
        if (!videoId) {
            return res.status(400).json({ error: 'URL tidak diisi. Silakan masukkan ID video YouTube. | Contoh : /ytmp4/id' });
        }
        
        const videoUrl = `https://youtu.be/${videoId}`;
        
        const data = await youtubedl(videoUrl);
        const { title } = data;
        const url = await data.video['720p'].download();
        
        res.json({ title, url });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
