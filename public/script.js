window.addEventListener('DOMContentLoaded', () => {
    updateTotalHits();
    updateTimeInZone('Asia/Jakarta', 'wib-time');
    updateTimeInZone('Asia/Jayapura', 'wit-time');
    setInterval(updateTimeInZone.bind(null, 'Asia/Jakarta', 'wib-time'), 1000); // Perbarui setiap 1 detik
    setInterval(updateTimeInZone.bind(null, 'Asia/Jayapura', 'wit-time'), 1000); // Perbarui setiap 1 detik
});

function updateTotalHits() {
    fetch('/total-hits')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-hits').textContent = data.totalHits;
        })
        .catch(error => console.error('Error fetching total hits:', error));
}

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
