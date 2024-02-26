const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        // Lakukan permintaan HTTP ke API waifu.im
        const response = await axios.get('https://api.waifu.im/search?included_tags=ero');

        // Dapatkan URL gambar dari respons JSON
        const imageUrl = response.data.images[0].url; // Misalnya, di sini saya mengambil URL gambar pertama dari respons

        // Tampilkan URL gambar di web Anda
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
                    <img src="${imageUrl}" alt="Ero Image">
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Failed to fetch image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

module.exports = router;
