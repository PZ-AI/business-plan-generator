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
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint to generate business plan
app.post('/api/generate-plan', (req, res) => {
  try {
    const { businessIdea, industry, targetMarket } = req.body;

    if (!businessIdea || businessIdea.trim() === '') {
      return res.status(400).json({ error: 'Business idea is required' });
    }

    console.log('Generating plan for:', businessIdea);
    const businessPlan = businessPlanGenerator.generateBusinessPlan({
      businessIdea,
      industry: industry || 'General',
      targetMarket: targetMarket || 'General Market',
    });

    console.log('Plan generated successfully');
    res.json(businessPlan);
  } catch (error) {
    console.error('Error generating business plan:', error.message);
    console.error('Full error:', error);
    res.status(500).json({
      error: 'Failed to generate business plan',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve index.html for all other routes (SPA routing)
app.get('*', (req, res) => {
  try {
    const indexPath = path.join(__dirname, '../public/index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('<h1>500: Internal Server Error</h1><p>Could not serve index.html</p>');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
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
