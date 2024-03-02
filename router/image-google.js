const express = require('express');
const router = express.Router();
const { googleImage } = require('@bochilteam/scraper-images');

router.get('/:query?', async (req, res) => {
  try {
    const { query } = req.params;

    // Jika query tidak diisi
    if (!query) {
      return res.status(400).json({ message: 'Mohon isi query! Contohnya: /query' });
    }

    const data = await googleImage(query);
    res.json(data); // Mengirim respons sebagai JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
