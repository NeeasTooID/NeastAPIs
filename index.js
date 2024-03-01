const express = require('express');
const path = require('path');
const fs = require('fs');
import chalk from 'chalk'; // Using require to import Chalk

const app = express();
const port = process.env.PORT || 8080;

// Initialize total hits
let totalHits = 0;

// Middleware to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware with clear timestamps and user-agent information
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const userAgent = req.headers['user-agent']; // Get browser information
  console.log(
    chalk.yellow(`[${timestamp}]`) +
      chalk.cyan(` | ${req.method}`) +
      chalk.green(` ${req.url}`) +
      chalk.magenta(` | user-agent: ${userAgent}`) // Log user-agent
  );
  next();
});

// Get all files from the 'router' folder
const routerPath = path.join(__dirname, 'router');
const routerFiles = fs.readdirSync(routerPath);

// Use a router object for each router file
const router = express.Router(); // Create a global router instance
routerFiles.forEach(file => {
  const routerName = path.basename(file, '.js');
  // Import router module dynamically (assuming consistent structure)
  const routerModule = require(`${routerPath}/${file}`);
  // Mount the imported router on the appropriate path
  app.use(`/${routerName}`, routerModule);
  // Register an incrementing middleware inside each mounted router
  router.use((req, res, next) => {
    totalHits++;
    next();
  });
});

// Middleware to handle '/total-hits' requests
app.get('/total-hits', (req, res) => {
  res.json({ totalHits });
});

// Handle unmatched requests with a custom 404 page (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Dll', 'error404.html')); // Customize error page path if needed
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${chalk.blue(`http://localhost:${port}`)}`);
});
