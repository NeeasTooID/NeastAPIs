// Menjalankan fungsi-fungsi terkait DOM setelah halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    // Memperbarui total hits dan waktu di zona
    updateTotalHits();
    updateTimeInZone('Asia/Jakarta', 'wib-time');
    updateTimeInZone('Asia/Jayapura', 'wit-time');
    
    // Perbarui waktu di zona setiap 1 detik
    setInterval(updateTimeInZone.bind(null, 'Asia/Jakarta', 'wib-time'), 1000);
    setInterval(updateTimeInZone.bind(null, 'Asia/Jayapura', 'wit-time'), 1000);
    
    // Mengatur href pada URL untuk mengikuti domain host
    setHrefToFollowHost();
});

// Fungsi untuk memperbarui total hits
function updateTotalHits() {
    fetch('/total-hits')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-hits').textContent = data.totalHits;
        })
        .catch(error => console.error('Error fetching total hits:', error));
}

// Fungsi untuk memperbarui waktu di zona tertentu
function updateTimeInZone(timezone, elementId) {
    const options = {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    document.getElementById(elementId).textContent = time;
}

// Fungsi untuk mengatur href pada URL untuk mengikuti domain host
function setHrefToFollowHost() {
    var links = document.querySelectorAll("a");
    var currentHost = window.location.protocol + "//" + window.location.hostname;

    links.forEach(function(link) {
        var href = link.getAttribute("href");
        if (!href.startsWith("http")) {
            var newHref = currentHost + href;
            link.setAttribute("href", newHref);
        }
    });
}
