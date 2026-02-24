const templates = require('./templates');

function generateBusinessPlan({ businessIdea, industry, targetMarket }) {
  const uuid = () => Math.random().toString(36).substr(2, 9);

  // Generate base information
  const businessName = generateBusinessName(businessIdea);
  const timestamp = new Date().toISOString();

  // Generate all sections of the business plan
  const businessPlan = {
    id: uuid(),
    businessName,
    createdAt: timestamp,
    businessIdea,
    industry,
    targetMarket,

    // Executive Summary
    executiveSummary: generateExecutiveSummary(businessIdea, businessName, industry),

    // Company Description
    companyDescription: generateCompanyDescription(businessIdea, industry, targetMarket),

    // Market Analysis
    marketAnalysis: generateMarketAnalysis(industry, targetMarket, businessIdea),

    // Products/Services
    productsAndServices: generateProductsAndServices(businessIdea),

    // Business Model
    businessModel: generateBusinessModel(businessIdea, industry),

    // Marketing & Sales Strategy
    marketingStrategy: generateMarketingStrategy(businessIdea, targetMarket, industry),

    // Operations Plan
    operationsPlan: generateOperationsPlan(businessIdea, industry),

    // Management & Organization
    management: generateManagement(businessIdea),

    // Financial Projections
    financialProjections: generateFinancialProjections(businessIdea, industry),

    // Funding Requirements
    fundingRequirements: generateFundingRequirements(businessIdea),

    // Risk Analysis
    riskAnalysis: generateRiskAnalysis(businessIdea, industry),

    // Growth Strategy
    growthStrategy: generateGrowthStrategy(businessIdea, industry),

    // Appendices
    appendices: generateAppendices(),
  };

  return businessPlan;
}

function generateBusinessName(businessIdea) {
  const words = businessIdea.split(' ').filter(w => w.length > 3);
  if (words.length === 0) return 'Innovate Co.';

  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const suggestions = [
    `${firstWord} Solutions`,
    `${firstWord}Hub`,
    `${firstWord}Labs`,
    `${firstWord} Co.`,
    `Prime${firstWord}`,
  ];

  return suggestions[Math.floor(Math.random() * suggestions.length)];
}

function generateExecutiveSummary(idea, name, industry) {
  return {
    overview: `${name} is a ${industry} company focused on ${idea}. We aim to deliver innovative solutions that address key market needs and create substantial value for our customers.`,
    mission: `Our mission is to transform the ${industry} industry by delivering exceptional ${idea.toLowerCase()} solutions that drive efficiency, innovation, and customer success.`,
    visionStatement: `To become the leading ${industry} provider known for our innovative approach, customer-centric solutions, and sustainable business practices.`,
    keySuccess: [
      'Strong market positioning and brand recognition',
      'High-quality product/service delivery',
      'Exceptional customer service and retention',
      'Sustainable profitability and growth',
      'Talented and motivated team',
    ],
    highlights: {
      marketOpportunity: 'Significant market growth projected at 15-25% annually',
      competitiveAdvantage: 'Unique value proposition with innovative features',
      revenueProjection: '$500K - $2M in year 1, scaling to $5M+ by year 3',
      fundingNeeded: '$100K - $250K for launch and initial operations',
    },
  };
}

function generateCompanyDescription(idea, industry, targetMarket) {
  return {
    overview: `We are a startup focused on providing cutting-edge solutions in the ${industry} space. Our company is dedicated to solving critical challenges faced by ${targetMarket}.`,
    legalStructure: 'LLC',
    location: 'Flexible (Remote-First or Based in Major Tech Hub)',
    history: 'Founded in 2025 to capitalize on emerging market opportunities in the ${industry} sector.',
    values: [
      'Innovation: Continuous improvement and forward-thinking solutions',
      'Customer Focus: Prioritizing client satisfaction and success',
      'Integrity: Honest, transparent business practices',
      'Collaboration: Building strong partnerships and teams',
      'Sustainability: Long-term value creation and responsible growth',
    ],
    objectives: [
      'Launch MVP within 6 months',
      'Acquire 100 customers in year 1',
      'Build a strong founding team',
      'Achieve profitability by year 2',
      'Scale to multiple market segments',
    ],
  };
}

function generateMarketAnalysis(industry, targetMarket, idea) {
  const marketSize = Math.floor(Math.random() * 5000000000) + 1000000000;

  return {
    marketSize: {
      current: `$${(marketSize / 1000000000).toFixed(1)}B`,
      projectedGrowth: `${10 + Math.floor(Math.random() * 20)}% CAGR`,
      timeframe: '2025-2030',
    },
    marketTrends: [
      'Increasing digital transformation across industries',
      'Growing demand for automation and efficiency',
      'Rising customer expectations for personalization',
      'Shift towards subscription and SaaS models',
      'Emphasis on data privacy and security',
    ],
    targetAudience: {
      primary: targetMarket,
      secondary: 'Adjacent market segments and verticals',
      tertiary: 'Global expansion opportunities',
    },
    marketSegmentation: {
      bySize: ['Small enterprises', 'Mid-market', 'Enterprise'],
      byGeography: ['North America', 'Europe', 'Asia-Pacific'],
      byUseCase: ['Cost reduction', 'Revenue growth', 'Operational efficiency'],
    },
    competitiveAnalysis: {
      directCompetitors: [
        { name: 'Market Leader A', strength: 'Brand recognition', weakness: 'Slow innovation' },
        { name: 'Market Leader B', strength: 'Technology', weakness: 'Poor customer service' },
        { name: 'Emerging Competitor C', strength: 'Innovation', weakness: 'Limited resources' },
      ],
      competitiveAdvantage: [
        `Unique approach to ${idea.toLowerCase()}`,
        'Superior user experience and design',
        'More cost-effective pricing model',
        'Faster implementation and time-to-value',
        'Better customer support and success management',
      ],
      marketPosition: 'Disruptor/Innovator positioned to capture significant market share',
    },
    demandValidation: 'Market research indicates strong demand with 78% of target audience expressing high interest',
  };
}

function generateProductsAndServices(idea) {
  return {
    primaryOffering: {
      name: `Flagship ${idea} Solution`,
      description: `A comprehensive solution that delivers ${idea.toLowerCase()} capabilities with enterprise-grade features.`,
      features: [
        'Intuitive user interface and dashboard',
        'Real-time analytics and reporting',
        'Seamless integrations with popular platforms',
        'Scalable infrastructure for growing needs',
        'Dedicated customer support',
        'Security and compliance certifications',
      ],
      pricing: 'Freemium model with premium tiers',
      targetCustomers: 'SMBs to Enterprise',
    },
    additionalServices: [
      {
        name: 'Premium Support & Onboarding',
        description: 'White-glove implementation and ongoing support services',
        pricing: 'Tiered based on company size',
      },
      {
        name: 'Consulting & Custom Development',
        description: 'Tailored solutions for enterprise clients',
        pricing: 'Custom per engagement',
      },
      {
        name: 'Training & Certification',
        description: 'Educational programs to maximize customer value',
        pricing: 'Subscription-based modules',
      },
    ],
    developmentRoadmap: {
      phase1: {
        timeline: 'Months 1-3',
        deliverables: ['MVP with core features', 'Initial user testing', 'Beta launch'],
      },
      phase2: {
        timeline: 'Months 4-6',
        deliverables: ['Additional features', 'Mobile app launch', 'Enhanced integrations'],
      },
      phase3: {
        timeline: 'Months 7-12',
        deliverables: ['AI/ML enhancements', 'Advanced analytics', 'Enterprise features'],
      },
    },
  };
}

function generateBusinessModel(idea, industry) {
  return {
    revenueStreams: [
      {
        name: 'Subscription Revenue',
        description: 'Monthly/annual SaaS subscriptions with tiered pricing',
        projection: '60% of total revenue',
      },
      {
        name: 'Implementation Services',
        description: 'Professional services for customer implementation',
        projection: '25% of total revenue',
      },
      {
        name: 'Premium Support',
        description: 'Enhanced support and SLA packages',
        projection: '10% of total revenue',
      },
      {
        name: 'Marketplace/Add-ons',
        description: 'Third-party integrations and extensions',
        projection: '5% of total revenue',
      },
    ],
    costStructure: {
      costOfRevenue: '20-30% (hosting, customer support, payment processing)',
      operatingExpenses: [
        'Personnel costs (engineering, sales, marketing): 40-50%',
        'Marketing and customer acquisition: 15-20%',
        'R&D and product development: 15-20%',
        'General and administrative: 10-15%',
      ],
      scalingStrategy: 'Leverage automation and AI to improve margins as revenue scales',
    },
    customerAcquisition: {
      strategy: 'Content marketing, direct sales, partnerships, and freemium model',
      expectedCAC: '$500-$1500 depending on segment',
      expectedLTV: '$15000-$50000+ based on subscription tier',
      paybackPeriod: '6-12 months',
    },
    partnerships: [
      'Technology partners for integrations',
      'Reseller and channel partners',
      'Strategic industry partnerships',
      'University and research partnerships',
    ],
  };
}

function generateMarketingStrategy(idea, targetMarket, industry) {
  return {
    positioningStatement: `${idea} reimagined for the modern ${industry} industry`,
    targetingStrategy: {
      primary: targetMarket,
      secondary: 'Adjacent verticals with similar pain points',
      messaging: 'Focus on ROI, efficiency gains, and ease of use',
    },
    marketingChannels: [
      {
        channel: 'Content Marketing',
        tactics: ['Blog posts', 'Whitepapers', 'Case studies', 'Webinars'],
        budget: '20%',
      },
      {
        channel: 'Digital Advertising',
        tactics: ['Google Ads', 'LinkedIn Ads', 'Social media ads', 'Retargeting'],
        budget: '25%',
      },
      {
        channel: 'Sales Outreach',
        tactics: ['Direct sales team', 'Partnerships', 'Account-based marketing'],
        budget: '30%',
      },
      {
        channel: 'Community & Events',
        tactics: ['Industry conferences', 'Meetups', 'User communities', 'Sponsorships'],
        budget: '15%',
      },
      {
        channel: 'Public Relations',
        tactics: ['Press releases', 'Media outreach', 'Thought leadership'],
        budget: '10%',
      },
    ],
    salesStrategy: {
      model: 'Freemium + Direct Sales for Enterprise',
      salesCycle: '2-6 months for mid-market, 6-12 months for enterprise',
      sellingProcess: [
        'Awareness through content and ads',
        'Free trial or freemium engagement',
        'Sales consultation and needs assessment',
        'Custom proposal and negotiation',
        'Onboarding and success management',
      ],
    },
    customerRetention: {
      strategies: [
        'Exceptional onboarding experience',
        'Regular check-ins and success reviews',
        'Continuous product improvements',
        'User community and peer support',
        'Loyalty rewards and upsell opportunities',
      ],
      targetRetentionRate: '90%+ annual retention',
    },
    metricsToBench: [
      'Customer Acquisition Cost (CAC)',
      'Customer Lifetime Value (LTV)',
      'Monthly Recurring Revenue (MRR)',
      'Churn rate',
      'Net Promoter Score (NPS)',
    ],
  };
}

function generateOperationsPlan(idea, industry) {
  return {
    overview: `Operations will focus on delivering ${idea.toLowerCase()} efficiently and at scale.`,
    productionProcess: [
      'Cloud-based infrastructure for scalability',
      'Continuous integration and deployment (CI/CD)',
      'Automated testing and quality assurance',
      'Security and compliance protocols',
      'Disaster recovery and business continuity',
    ],
    facilities: 'Remote-first with distributed team across time zones',
    technology: {
      infrastructure: 'AWS/GCP/Azure cloud services',
      development: 'Modern tech stack (React, Node.js, PostgreSQL)',
      tools: 'Project management, collaboration, and analytics tools',
    },
    staffing: {
      phase1: 'Founding team (3-5 people)',
      phase2: 'Expand to 10-15 people within 12 months',
      phase3: 'Scale to 30+ people by year 2',
      roles: [
        'CTO/Head of Engineering',
        'Head of Product',
        'Head of Sales',
        'Head of Marketing',
        'Head of Customer Success',
        'CFO/Finance',
      ],
    },
    qualityAssurance: [
      'Automated testing (unit, integration, E2E)',
      'Code reviews and standards',
      'User acceptance testing',
      'Performance monitoring and optimization',
      'Customer feedback integration',
    ],
    suppliers: 'Vetted third-party services for non-core functions',
  };
}

function generateManagement(idea) {
  return {
    organizationalStructure: {
      board: ['Founder/CEO', 'Board members and advisors'],
      departments: [
        'Engineering & Product',
        'Sales & Marketing',
        'Customer Success',
        'Finance & Operations',
      ],
    },
    keyPersonnel: [
      {
        position: 'Chief Executive Officer',
        responsibility: 'Overall vision, strategy, and execution',
        qualifications: 'Startup experience, deep industry knowledge',
      },
      {
        position: 'Chief Technology Officer',
        responsibility: 'Product development and technical strategy',
        qualifications: 'Software architecture, scaling expertise',
      },
      {
        position: 'VP of Sales',
        responsibility: 'Building sales team and driving revenue',
        qualifications: 'SaaS sales experience, enterprise relationships',
      },
      {
        position: 'VP of Product',
        responsibility: 'Product roadmap and user experience',
        qualifications: 'Product management, customer research',
      },
    ],
    advisors: [
      'Industry experts and thought leaders',
      'Successful entrepreneurs and operators',
      'Domain specialists and consultants',
    ],
    cultureValues: [
      'Innovation and continuous improvement',
      'Customer obsession',
      'Data-driven decision making',
      'Transparency and communication',
      'Work-life balance and well-being',
    ],
    boardMeetings: 'Quarterly board meetings with monthly updates',
  };
}

function generateFinancialProjections(idea, industry) {
  const year1Rev = 500000;
  const year2Rev = Math.round(year1Rev * 3);
  const year3Rev = Math.round(year2Rev * 2.5);

  return {
    assumptions: {
      customerAcquisition: '100 customers in Year 1, 300 in Year 2, 750 in Year 3',
      averageContractValue: '$5000 annually',
      churnRate: '5% monthly, improving to 3% by Year 3',
      grossMargin: '70% by Year 2',
    },
    revenueProjections: {
      year1: {
        total: `$${(year1Rev / 1000).toFixed(0)}K`,
        breakdown: {
          subscriptions: `$${Math.round(year1Rev * 0.6) / 1000}K`,
          services: `$${Math.round(year1Rev * 0.3) / 1000}K`,
          other: `$${Math.round(year1Rev * 0.1) / 1000}K`,
        },
      },
      year2: {
        total: `$${(year2Rev / 1000).toFixed(0)}K`,
        breakdown: {
          subscriptions: `$${Math.round(year2Rev * 0.65) / 1000}K`,
          services: `$${Math.round(year2Rev * 0.25) / 1000}K`,
          other: `$${Math.round(year2Rev * 0.1) / 1000}K`,
        },
      },
      year3: {
        total: `$${(year3Rev / 1000).toFixed(0)}K`,
        breakdown: {
          subscriptions: `$${Math.round(year3Rev * 0.7) / 1000}K`,
          services: `$${Math.round(year3Rev * 0.2) / 1000}K`,
          other: `$${Math.round(year3Rev * 0.1) / 1000}K`,
        },
      },
    },
    expenseProjections: {
      year1: `$${Math.round(year1Rev * 1.2) / 1000}K (operating at loss to invest in growth)`,
      year2: `$${Math.round(year2Rev * 0.75) / 1000}K (approaching profitability)`,
      year3: `$${Math.round(year3Rev * 0.5) / 1000}K (strong profitability)`,
    },
    profitabilityMetrics: {
      breakEvenPoint: '18-24 months',
      grossMarginYear1: '40%',
      grossMarginYear3: '75%',
      operatingMarginYear3: '30%',
    },
    cashFlowProjection: {
      year1: 'Negative, funded by investment',
      year2: 'Approaching breakeven',
      year3: 'Positive with strong cash generation',
    },
    balanceSheetHighlights: {
      assets: 'Cash, accounts receivable, equipment',
      liabilities: 'Accounts payable, deferred revenue',
      equity: 'Founder investment and future venture capital',
    },
  };
}

function generateFundingRequirements(idea) {
  return {
    totalFundingNeeded: '$200,000 - $500,000',
    fundingAllocation: {
      productDevelopment: '35%',
      marketingAndSales: '30%',
      operationsAndAdmin: '15%',
      workingCapital: '10%',
      contingency: '10%',
    },
    fundingRound: {
      name: 'Seed Round',
      target: '$250,000',
      preMoneyValuation: '$1,000,000',
      equityOffered: '20-25%',
    },
    useOfFunds: [
      {
        category: 'Product Development',
        description: 'Engineering team, hosting, tools',
        amount: '35%',
      },
      {
        category: 'Go-to-Market',
        description: 'Sales, marketing, customer acquisition',
        amount: '30%',
      },
      {
        category: 'Team & Operations',
        description: 'Salaries, legal, administrative',
        amount: '25%',
      },
      {
        category: 'Working Capital',
        description: 'Cash buffer and contingency',
        amount: '10%',
      },
    ],
    exitStrategy: 'Acquisition by larger industry player or IPO within 5-7 years',
    investorReturn: 'Projected 10-25x return potential',
  };
}

function generateRiskAnalysis(idea, industry) {
  return {
    marketRisks: [
      {
        risk: 'Market adoption slower than expected',
        likelihood: 'Medium',
        impact: 'High',
        mitigation: 'Validate market demand early with customer interviews and MVP testing',
      },
      {
        risk: 'Increased competition from larger players',
        likelihood: 'High',
        impact: 'Medium',
        mitigation: 'Focus on niche differentiation and build strong customer relationships',
      },
      {
        risk: 'Market size smaller than projected',
        likelihood: 'Low',
        impact: 'High',
        mitigation: 'Expand to adjacent markets and use-cases',
      },
    ],
    operationalRisks: [
      {
        risk: 'Key team member departure',
        likelihood: 'Low',
        impact: 'High',
        mitigation: 'Competitive comp, equity incentives, strong culture',
      },
      {
        risk: 'Technical challenges in product development',
        likelihood: 'Medium',
        impact: 'Medium',
        mitigation: 'Experienced engineering team, rigorous testing',
      },
      {
        risk: 'Security breach or data loss',
        likelihood: 'Low',
        impact: 'Critical',
        mitigation: 'Security best practices, insurance, compliance certifications',
      },
    ],
    financialRisks: [
      {
        risk: 'Higher than projected customer acquisition costs',
        likelihood: 'Medium',
        impact: 'Medium',
        mitigation: 'Diversified marketing channels, strong product-market fit',
      },
      {
        risk: 'Funding delays or difficulty raising capital',
        likelihood: 'Medium',
        impact: 'High',
        mitigation: 'Conservative burn rate, multiple investor discussions',
      },
      {
        risk: 'Unexpected market downturns',
        likelihood: 'Low',
        impact: 'Medium',
        mitigation: 'Focus on ROI and cost savings benefits',
      },
    ],
  };
}

function generateGrowthStrategy(idea, industry) {
  return {
    year1Goals: [
      'Achieve product-market fit with MVP',
      'Acquire first 100 customers',
      'Build initial team of 5-8 people',
      'Generate $500K+ revenue',
      'Establish brand presence in target market',
    ],
    year2Goals: [
      'Expand to 3-5 market segments',
      'Scale customer base to 300+',
      'Reach $1.5M+ revenue',
      'Expand team to 15-20 people',
      'Secure Series A funding',
    ],
    year3Goals: [
      'Become market leader in primary segment',
      'Expand to international markets',
      'Reach $5M+ revenue with profitability',
      'Scale team to 40+ people',
      'Launch strategic partnerships',
    ],
    expansionStrategy: {
      geographic: 'US market first, then expand to EU and APAC',
      vertical: 'Start with primary industry, expand to adjacent verticals',
      productLine: 'Core product, then complementary products and services',
      acquisition: 'Acquire complementary tools or companies to accelerate growth',
    },
    strategicInitiatives: [
      'Build ecosystem and partnership network',
      'Invest in R&D for next-generation features',
      'Develop thought leadership and brand authority',
      'Explore strategic acquisitions for acceleration',
      'Build customer advisory board',
    ],
  };
}

function generateAppendices() {
  return {
    marketResearch: {
      sources: [
        'Industry reports and analyst coverage',
        'Customer interviews and surveys',
        'Competitive analysis',
        'Trend analysis',
      ],
      availability: 'Available upon request',
    },
    teamResumes: {
      description: 'Detailed resumes of key team members',
      availability: 'Available upon request',
    },
    productScreenshots: {
      description: 'Mockups or actual product interface',
      availability: 'Available upon request',
    },
    letterOfRecommendation: {
      description: 'From advisors, partners, or early customers',
      availability: 'Available upon request',
    },
    detailedFinancialModels: {
      description: 'Full P&L, balance sheet, and cash flow projections',
      availability: 'Shared with serious investors under NDA',
    },
  };
}

module.exports = { generateBusinessPlan };
