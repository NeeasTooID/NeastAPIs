const express = require('express');
const router = express.Router();
const { search } = require("pinterest-dl");

// Menyimpan nama file sebagai nama router
const routerName = __filename.split('/').pop().replace('.js', '');

router.get(`/${routerName}`, async (req, res) => {
  try {
    // Melakukan pencarian dengan menggunakan pinterest-dl
    const data = await search(routerName);

    // Memeriksa apakah ada pin yang ditemukan
    if (!data.length) {
      return res.status(404).json({ error: 'Pin not found' });
    }

    // Mengambil URL gambar dari pin pertama
    const chosenPin = data[0];
    const imageUrl = chosenPin.url;

    // Menyiapkan tag <img> dengan sumber gambar dari Pinterest
    const imageTag = `<img src="${imageUrl}" alt="Pinterest Image">`;

    // Mengirimkan tag <img> sebagai respons
    res.send(imageTag);
  } catch (error) {
    console.error('Error fetching pin image:', error);
    res.status(500).json({ error: 'Failed to load image' });
  }
});

module.exports = router;
