const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

// Inisialisasi total hits
let totalHits = 0;

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] | ${req.url}`);
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
