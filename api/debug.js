module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GOOGLE_GEMINI_API_KEY not set',
        hasKey: false,
        env: Object.keys(process.env).filter(k => k.includes('GOOGLE') || k.includes('API'))
      });
    }

    // Test Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: 'Say hello' }]
        }]
      })
    });

    const data = await response.json();

    res.status(200).json({
      success: response.ok,
      status: response.status,
      geminiResponse: data,
      hasKey: !!apiKey,
      keyPreview: apiKey ? apiKey.substring(0, 10) + '...' : 'NOT SET'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
};
