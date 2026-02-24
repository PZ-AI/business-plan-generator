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

// Serve static files from public folder
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test endpoint to verify API works
app.post('/api/test', (req, res) => {
  console.log('=== TEST ENDPOINT ===');
  res.json({ message: 'API is working', received: req.body });
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

    console.log('About to call generateBusinessPlan function...');
    console.log('businessPlanGenerator type:', typeof businessPlanGenerator);
    console.log('businessPlanGenerator keys:', Object.keys(businessPlanGenerator));

    // Check if function exists
    if (typeof businessPlanGenerator.generateBusinessPlan !== 'function') {
      throw new Error('generateBusinessPlan is not a function. Available: ' + Object.keys(businessPlanGenerator).join(', '));
    }

    console.log('Calling generateBusinessPlan...');
    const businessPlan = businessPlanGenerator.generateBusinessPlan({
      businessIdea: businessIdea.trim(),
      industry: industry || 'General',
      targetMarket: targetMarket || 'General Market',
    });

    console.log('Plan generated successfully');
    console.log('Plan type:', typeof businessPlan);
    console.log('Plan is null/undefined:', businessPlan == null);

    if (!businessPlan) {
      throw new Error('generateBusinessPlan returned null or undefined');
    }

    console.log('Plan keys:', Object.keys(businessPlan));

    res.setHeader('Content-Type', 'application/json');
    const jsonString = JSON.stringify(businessPlan);
    console.log('JSON stringified, length:', jsonString.length);
    res.json(businessPlan);
    console.log('Response sent successfully');
  } catch (error) {
    console.error('=== ERROR in /api/generate-plan ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    res.status(500).json({
      error: 'Failed to generate business plan',
      details: error.message,
      type: error.constructor.name
    });
  }
});

// Serve index.html for all other routes (SPA routing)
app.get('*', (req, res) => {
  try {
    console.log('Serving index.html for route:', req.path);
    const indexPath = path.join(publicPath, 'index.html');

    // Check if file exists
    if (!fs.existsSync(indexPath)) {
      console.error('index.html not found at:', indexPath);
      console.error('publicPath:', publicPath);
      console.error('Files in publicPath:', fs.readdirSync(publicPath));
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
