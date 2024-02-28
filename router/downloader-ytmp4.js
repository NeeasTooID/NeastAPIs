const express = require('express');
const { youtubedl } = require('@bochilteam/scraper-sosmed');

const app = express();
const PORT = 3000;

app.get('/:url', async (req, res) => {
    try {
        const videoUrl = req.params.url;
        const data = await youtubedl(`https://*/${videoUrl}`);
        
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
