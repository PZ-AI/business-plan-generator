// Google Gemini AI-Powered Business Plan Generator
// Uses built-in fetch (Node.js 18+)

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
// Using gemini-2.0-flash which is available in the free tier
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function callGemini(prompt) {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GOOGLE_GEMINI_API_KEY environment variable not set');
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini API error: ${response.status} - ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return text;
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw error;
  }
}

async function generateBusinessPlan({ businessIdea, industry, targetMarket }) {
  const uuid = () => Math.random().toString(36).substr(2, 9);

  try {
    console.log('Generating AI-powered business plan for:', businessIdea);

    // Generate business name with AI
    const namePrompt = `Generate a creative and professional business name for a company that: ${businessIdea}. Just respond with the business name only, nothing else. Maximum 3 words.`;
    const businessName = (await callGemini(namePrompt)).trim();

    console.log('Generated business name:', businessName);

    // Generate all sections with AI
    const businessPlan = {
      id: uuid(),
      businessName,
      createdAt: new Date().toISOString(),
      businessIdea,
      industry,
      targetMarket,
      aiPowered: true,

      executiveSummary: await generateSection('Executive Summary', businessIdea, industry, targetMarket),
      companyDescription: await generateSection('Company Description', businessIdea, industry, targetMarket),
      marketAnalysis: await generateSection('Market Analysis', businessIdea, industry, targetMarket),
      productsAndServices: await generateSection('Products and Services', businessIdea, industry, targetMarket),
      businessModel: await generateSection('Business Model', businessIdea, industry, targetMarket),
      marketingStrategy: await generateSection('Marketing and Sales Strategy', businessIdea, industry, targetMarket),
      operationsPlan: await generateSection('Operations Plan', businessIdea, industry, targetMarket),
      management: await generateSection('Management and Organization', businessIdea, industry, targetMarket),
      financialProjections: await generateSection('Financial Projections', businessIdea, industry, targetMarket),
      fundingRequirements: await generateSection('Funding Requirements', businessIdea, industry, targetMarket),
      riskAnalysis: await generateSection('Risk Analysis', businessIdea, industry, targetMarket),
      growthStrategy: await generateSection('Growth Strategy', businessIdea, industry, targetMarket),
    };

    console.log('Business plan generated successfully');
    return businessPlan;
  } catch (error) {
    console.error('Error generating business plan:', error.message);
    throw error;
  }
}

async function generateSection(section, businessIdea, industry, targetMarket) {
  const prompt = `You are a business consultant. Create a professional ${section} for a ${industry} business.

Business Details:
- Business Idea: ${businessIdea}
- Industry: ${industry}
- Target Market: ${targetMarket}

Provide the ${section} in a JSON format with relevant subsections and details. Make it detailed, professional, and actionable.
Format your response ONLY as valid JSON with appropriate keys and values. No markdown, no code blocks, just pure JSON.`;

  try {
    const content = await callGemini(prompt);

    // Try to parse as JSON, if it fails, wrap it as a string
    try {
      return JSON.parse(content);
    } catch {
      return {
        content: content,
        description: `${section} content`
      };
    }
  } catch (error) {
    console.error(`Error generating ${section}:`, error.message);
    return {
      error: `Failed to generate ${section}`,
      details: error.message
    };
  }
}

module.exports = { generateBusinessPlan };
