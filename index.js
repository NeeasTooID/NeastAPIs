const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8080;

// Fungsi untuk mengirim log ke Discord webhook
async function sendLogToDiscord(message) {
  try {
    await axios.post('https://discord.com/api/webhooks/1213201376310722570/SjGu6A697TPF6K_icmXc1uDC1x_LTthGH47a2MkoMaBsjt5yq2sq4RsxH8jcAU0ceG_l', { content: message });
    console.log('Log terkirim ke Discord webhook');
  } catch (error) {
    console.error('Gagal mengirim log ke Discord webhook:', error);
  }
}

// Inisialisasi total hits
let totalHits = 0;

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] | ${req.url}`;
    console.log(logMessage);
    sendLogToDiscord(logMessage); // Kirim log ke Discord
    next();
});

// Daftar semua file di dalam folder 'router'
const routerPath = path.join(__dirname, 'router');
const routerFiles = fs.readdirSync(routerPath);

// Gunakan router untuk masing-masing file router
routerFiles.forEach(file => {
    const routerName = path.basename(file, '.js');
    const router = require(path.join(routerPath, file));
    app.use(`/${routerName}`, (req, res, next) => {
        totalHits++; // Tambahkan 1 ke total hit
        next();
    }, router);
});

// Middleware untuk menangani permintaan total hit
app.get('/total-hits', (req, res) => {
    res.json({ totalHits });
});

// Middleware untuk menambahkan hit baru
app.use((req, res, next) => {
    totalHits++; // Tambahkan 1 ke total hit
    next();
});

// Mengalihkan semua permintaan yang tidak cocok dengan file statis ke halaman beranda (index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Dll', 'error404.html'));
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
