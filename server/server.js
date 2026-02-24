const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const apiRouter = require('./api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, '../public');

// ===== API ROUTES FIRST =====
app.use('/api', apiRouter);

// ===== STATIC FILES =====
app.use(express.static(publicPath));

// ===== SPA CATCH-ALL =====
app.get('*', (req, res) => {
  try {
    const indexPath = path.join(publicPath, 'index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (error) {
    console.error('Error serving index.html:', error.message);
    res.status(500).send('<h1>500: Internal Server Error</h1><p>' + error.message + '</p>');
  }
});

// For local development
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
