const express = require('express');
const router = express.Router();
const scraper = require('@bochilteam/scraper');

router.get('/', async (req, res, next) => {
    try {
        const url = req.query.url;

        // Pengecekan URL
        if (!url) {
            return res.status(400).json({
                status: false,
                message: "URL is required."
            });
        }

        // Pengunduhan audio dari YouTube
        const { id, thumbnail, audio: _audio, title } = await scraper.youtubedlv2(url);
        const downloads = [];

        for (const audio of Object.values(_audio)) {
            const kin = await audio.download();
            downloads.push({
                quality: audio.quality,
                size: audio.fileSize,
                download: kin
            });
        }

        // Respons JSON dengan detail unduhan
        res.json({
            id: id,
            thumbnail: thumbnail,
            title: title,
            downloads: downloads
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
});

module.exports = router;
