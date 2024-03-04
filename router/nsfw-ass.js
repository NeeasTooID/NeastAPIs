const express = require('express');
const router = express.Router();
const axios = require('axios');
const sharp = require('sharp'); // Import sharp library

router.get('/', async (req, res) => {
    try {
        // Lakukan permintaan HTTP ke API waifu.im
        const response = await axios.get('https://api.waifu.im/search?included_tags=ass');

        // Dapatkan URL gambar dari respons JSON
        const imageUrl = response.data.images[0].url; // Misalnya, di sini saya mengambil URL gambar pertama dari respons

        // Konversi gambar menjadi format PNG
        const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const image = sharp(imageBuffer.data);
        const pngBuffer = await image.png().toBuffer();

        // Tampilkan gambar PNG di web Anda
        res.send(`
            <html>
                <head>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            background-color: black; /* Set background color to black */
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: auto;
                        }
                        img {
                            max-width: 100%; /* Make the image responsive */
                            height: auto;
                        }
                    </style>
                </head>
                <body>
                    <img src="data:image/png;base64,${pngBuffer.toString('base64')}" alt="Hentai Image">
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Failed to fetch image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

module.exports = router;
