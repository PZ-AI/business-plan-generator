const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const businessPlanGenerator = require('./businessPlanGenerator');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, '../public');

// ===== API ROUTES MUST COME FIRST =====
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test endpoint to verify API works
app.post('/api/test', (req, res) => {
  console.log('=== TEST ENDPOINT ===');
  res.json({ message: 'API is working! Routes are in correct order.', received: req.body });
});

// API endpoint to generate business plan
app.post('/api/generate-plan', (req, res) => {
  try {
    console.log('=== API CALL: /api/generate-plan ===');
    const { businessIdea, industry, targetMarket } = req.body;
    console.log('Request body:', { businessIdea, industry, targetMarket });

    if (!businessIdea || businessIdea.trim() === '') {
      console.log('Error: No business idea provided');
      return res.status(400).json({ error: 'Business idea is required' });
    }

    console.log('Generating business plan...');
    const businessPlan = businessPlanGenerator.generateBusinessPlan({
      businessIdea: businessIdea.trim(),
      industry: industry || 'General',
      targetMarket: targetMarket || 'General Market',
    });

    console.log('Plan generated successfully');
    res.setHeader('Content-Type', 'application/json');
    res.json(businessPlan);
  } catch (error) {
    console.error('=== ERROR in /api/generate-plan ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    res.status(500).json({
      error: 'Failed to generate business plan',
      details: error.message
    });
  }
});

// ===== STATIC FILES AND SPA ROUTING =====
// Serve static files from public folder (but NOT for /api routes)
app.use(express.static(publicPath));

// Serve index.html for all other GET requests (SPA routing)
app.get('*', (req, res) => {
  try {
    const indexPath = path.join(publicPath, 'index.html');

    if (!fs.existsSync(indexPath)) {
      console.error('index.html not found at:', indexPath);
      return res.status(404).send('<h1>404: index.html not found</h1>');
    }

    const html = fs.readFileSync(indexPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (error) {
    console.error('Error serving index.html:', error.message);
    res.status(500).send('<h1>500: Internal Server Error</h1><p>' + error.message + '</p>');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('=== ERROR MIDDLEWARE ===');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// For local development
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for Vercel
module.exports = app;
