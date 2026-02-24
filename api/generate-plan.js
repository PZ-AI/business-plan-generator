const businessPlanGenerator = require('../server/businessPlanGenerator');

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== API: generate-plan ===');
    const { businessIdea, industry, targetMarket } = req.body;
    console.log('Received:', { businessIdea, industry, targetMarket });

    if (!businessIdea || businessIdea.trim() === '') {
      return res.status(400).json({ error: 'Business idea is required' });
    }

    console.log('Generating plan...');
    const businessPlan = businessPlanGenerator.generateBusinessPlan({
      businessIdea: businessIdea.trim(),
      industry: industry || 'General',
      targetMarket: targetMarket || 'General Market',
    });

    console.log('Plan generated successfully');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(businessPlan);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate business plan',
      details: error.message
    });
  }
};
