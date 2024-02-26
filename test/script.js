const socket = new WebSocket('ws://localhost:8080'); // Change the URL accordingly

socket.addEventListener('open', function (event) {
  console.log('WebSocket connected');
});

socket.addEventListener('message', function (event) {
  const data = JSON.parse(event.data);
  updateVisitorCount(data.visitorCount);
  updateServerStats(data.serverStats);
});

function updateVisitorCount(visitorCount) {
  document.getElementById('total-visitors').textContent = visitorCount;
}

function updateServerStats(serverStats) {
  document.getElementById('uptime').textContent = serverStats.uptime;
  document.getElementById('cpu-usage').textContent = serverStats.cpuUsage;
  document.getElementById('ram-usage').textContent = serverStats.ramUsage;
  document.getElementById('wib-time').textContent = serverStats.wibTime;
}
