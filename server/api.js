const express = require('express');
const cors = require('cors');
const businessPlanGenerator = require('./businessPlanGenerator');

const router = express.Router();

router.use(cors());
router.use(express.json());

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test endpoint
router.post('/test', (req, res) => {
  res.json({ message: 'API is working! Routes are in correct order.', received: req.body });
});

// Generate business plan
router.post('/generate-plan', (req, res) => {
  try {
    console.log('=== API CALL: /api/generate-plan ===');
    const { businessIdea, industry, targetMarket } = req.body;

    if (!businessIdea || businessIdea.trim() === '') {
      return res.status(400).json({ error: 'Business idea is required' });
    }

    const businessPlan = businessPlanGenerator.generateBusinessPlan({
      businessIdea: businessIdea.trim(),
      industry: industry || 'General',
      targetMarket: targetMarket || 'General Market',
    });

    res.json(businessPlan);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate business plan',
      details: error.message
    });
  }
});

module.exports = router;
