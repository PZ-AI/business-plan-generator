const { useState } = React;

// Main App Component
function App() {
  const [businessIdea, setBusinessIdea] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [targetMarket, setTargetMarket] = useState('');
  const [businessPlan, setBusinessPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('executive-summary');

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Education',
    'Manufacturing',
    'Retail',
    'Hospitality',
    'Real Estate',
    'Energy',
  ];

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setError('');

    if (!businessIdea.trim()) {
      setError('Please enter a business idea');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessIdea,
          industry,
          targetMarket: targetMarket || 'General Market',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate business plan');
      }

      const plan = await response.json();
      setBusinessPlan(plan);
      setActiveTab('executive-summary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setBusinessPlan(null);
    setBusinessIdea('');
    setIndustry('Technology');
    setTargetMarket('');
    setError('');
    setActiveTab('executive-summary');
  };

  const exportToPDF = () => {
    if (!businessPlan) return;

    const content = generatePlainText(businessPlan);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessPlan.businessName}-Business-Plan.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportAsJSON = () => {
    if (!businessPlan) return;

    const json = JSON.stringify(businessPlan, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessPlan.businessName}-Business-Plan.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generatePlainText = (plan) => {
    const lines = [
      `${plan.businessName} - COMPREHENSIVE BUSINESS PLAN`,
      '='.repeat(80),
      '',
      `Created: ${new Date(plan.createdAt).toLocaleDateString()}`,
      `Business Idea: ${plan.businessIdea}`,
      `Industry: ${plan.industry}`,
      `Target Market: ${plan.targetMarket}`,
      '',
      'EXECUTIVE SUMMARY',
      '-'.repeat(80),
      plan.executiveSummary.overview,
      '',
      `Mission: ${plan.executiveSummary.mission}`,
      `Vision: ${plan.executiveSummary.visionStatement}`,
      '',
      'Key Success Factors:',
      plan.executiveSummary.keySuccess.map(k => `• ${k}`).join('\n'),
      '',
      'Financial Highlights:',
      Object.entries(plan.executiveSummary.highlights)
        .map(([k, v]) => `• ${k}: ${v}`)
        .join('\n'),
      '',
      'For complete business plan details, open the interactive version.',
    ];

    return lines.join('\n');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>💼 Business Plan Generator</h1>
        <p>Transform your business idea into a comprehensive strategy</p>
      </header>

      <div className="container">
        {!businessPlan ? (
          <>
            <div className="form-section">
              <h2>Create Your Business Plan</h2>
              {error && <div className="alert alert-error">⚠️ {error}</div>}

              <form onSubmit={handleGeneratePlan}>
                <div className="form-group">
                  <label htmlFor="businessIdea">Your Business Idea *</label>
                  <textarea
                    id="businessIdea"
                    value={businessIdea}
                    onChange={(e) => setBusinessIdea(e.target.value)}
                    placeholder="e.g., An AI-powered platform that helps small businesses manage their inventory automatically"
                    disabled={loading}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="industry">Industry *</label>
                    <select
                      id="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      disabled={loading}
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="targetMarket">Target Market</label>
                    <input
                      id="targetMarket"
                      type="text"
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      placeholder="e.g., Small retail businesses with 5-50 employees"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="btn-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Generating...
                      </>
                    ) : (
                      '✨ Generate Business Plan'
                    )}
                  </button>
                </div>
              </form>

              <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f0f4ff', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e40af', fontSize: '1rem' }}>💡 Pro Tips</h3>
                <ul style={{ margin: '0', paddingLeft: '1.5rem', fontSize: '0.9rem', color: '#475569' }}>
                  <li>Be specific about your business idea for better results</li>
                  <li>Choose an industry that matches your business</li>
                  <li>Define your target market to get tailored recommendations</li>
                  <li>Review and customize all sections for your specific needs</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <BusinessPlanDisplay
            plan={businessPlan}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onExportText={exportToPDF}
            onExportJSON={exportAsJSON}
            onClear={handleClear}
          />
        )}
      </div>
    </div>
  );
}

// Business Plan Display Component
function BusinessPlanDisplay({ plan, activeTab, setActiveTab, onExportText, onExportJSON, onClear }) {
  const tabs = [
    { id: 'executive-summary', label: 'Executive Summary', icon: '📋' },
    { id: 'company', label: 'Company', icon: '🏢' },
    { id: 'market', label: 'Market Analysis', icon: '📊' },
    { id: 'products', label: 'Products & Services', icon: '📦' },
    { id: 'business-model', label: 'Business Model', icon: '💹' },
    { id: 'marketing', label: 'Marketing & Sales', icon: '📢' },
    { id: 'operations', label: 'Operations', icon: '⚙️' },
    { id: 'management', label: 'Management', icon: '👥' },
    { id: 'financial', label: 'Financial Projections', icon: '💰' },
    { id: 'funding', label: 'Funding', icon: '💳' },
    { id: 'risk', label: 'Risk Analysis', icon: '⚠️' },
    { id: 'growth', label: 'Growth Strategy', icon: '📈' },
  ];

  return (
    <div className="results-section">
      <div className="business-plan">
        <div className="plan-header">
          <h2>{plan.businessName}</h2>
          <p>{plan.businessIdea}</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Industry: {plan.industry} | Target Market: {plan.targetMarket}
          </p>
        </div>

        <div className="plan-content">
          <div className="export-controls">
            <button className="btn btn-primary" onClick={onExportText}>
              📄 Download as Text
            </button>
            <button className="btn btn-primary" onClick={onExportJSON}>
              📋 Download as JSON
            </button>
            <button className="btn btn-secondary" onClick={onClear}>
              ↻ Create New Plan
            </button>
          </div>

          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content active">
            {activeTab === 'executive-summary' && (
              <ExecutiveSummaryTab summary={plan.executiveSummary} />
            )}
            {activeTab === 'company' && (
              <CompanyTab company={plan.companyDescription} />
            )}
            {activeTab === 'market' && (
              <MarketTab market={plan.marketAnalysis} />
            )}
            {activeTab === 'products' && (
              <ProductsTab products={plan.productsAndServices} />
            )}
            {activeTab === 'business-model' && (
              <BusinessModelTab model={plan.businessModel} />
            )}
            {activeTab === 'marketing' && (
              <MarketingTab marketing={plan.marketingStrategy} />
            )}
            {activeTab === 'operations' && (
              <OperationsTab operations={plan.operationsPlan} />
            )}
            {activeTab === 'management' && (
              <ManagementTab management={plan.management} />
            )}
            {activeTab === 'financial' && (
              <FinancialTab financial={plan.financialProjections} />
            )}
            {activeTab === 'funding' && (
              <FundingTab funding={plan.fundingRequirements} />
            )}
            {activeTab === 'risk' && (
              <RiskTab risk={plan.riskAnalysis} />
            )}
            {activeTab === 'growth' && (
              <GrowthTab growth={plan.growthStrategy} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab Components
function ExecutiveSummaryTab({ summary }) {
  return (
    <div className="section">
      <h3>Executive Summary</h3>
      <p>{summary.overview}</p>

      <div className="grid-2">
        <div className="card">
          <h4>🎯 Mission</h4>
          <p>{summary.mission}</p>
        </div>
        <div className="card">
          <h4>🌟 Vision</h4>
          <p>{summary.visionStatement}</p>
        </div>
      </div>

      <h4>Key Success Factors</h4>
      {summary.keySuccess.map((factor, i) => (
        <div key={i} className="list-item">
          ✓ {factor}
        </div>
      ))}

      <h4 style={{ marginTop: '2rem' }}>Financial Highlights</h4>
      <table className="table">
        <tbody>
          {Object.entries(summary.highlights).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 600 }}>{key.replace(/([A-Z])/g, ' $1')}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompanyTab({ company }) {
  return (
    <div className="section">
      <h3>Company Description</h3>
      <p>{company.overview}</p>

      <h4>Legal Structure & Location</h4>
      <div className="grid-2">
        <div className="card">
          <strong>Structure:</strong> {company.legalStructure}
        </div>
        <div className="card">
          <strong>Location:</strong> {company.location}
        </div>
      </div>

      <h4>Company Values</h4>
      {company.values.map((value, i) => (
        <div key={i} className="list-item">
          {value}
        </div>
      ))}

      <h4>Business Objectives</h4>
      {company.objectives.map((obj, i) => (
        <div key={i} className="list-item">
          📌 {obj}
        </div>
      ))}
    </div>
  );
}

function MarketTab({ market }) {
  return (
    <div className="section">
      <h3>Market Analysis</h3>

      <h4>Market Size & Growth</h4>
      <div className="card">
        <strong>Current Market Size:</strong> {market.marketSize.current}
        <br />
        <strong>Projected Growth:</strong> {market.marketSize.projectedGrowth}
        <br />
        <strong>Timeframe:</strong> {market.marketSize.timeframe}
      </div>

      <h4>Market Trends</h4>
      {market.marketTrends.map((trend, i) => (
        <div key={i} className="list-item">
          📈 {trend}
        </div>
      ))}

      <h4>Target Audience</h4>
      <table className="table">
        <tbody>
          {Object.entries(market.targetAudience).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 600 }}>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Competitive Advantages</h4>
      {market.competitiveAnalysis.competitiveAdvantage.map((adv, i) => (
        <div key={i} className="list-item">
          ⭐ {adv}
        </div>
      ))}

      <h4>Market Position</h4>
      <div className="card">
        {market.competitiveAnalysis.marketPosition}
      </div>
    </div>
  );
}

function ProductsTab({ products }) {
  return (
    <div className="section">
      <h3>Products & Services</h3>

      <h4>Primary Offering</h4>
      <div className="card">
        <h5 style={{ marginTop: 0 }}>{products.primaryOffering.name}</h5>
        <p>{products.primaryOffering.description}</p>
        <strong>Features:</strong>
        {products.primaryOffering.features.map((feature, i) => (
          <div key={i} className="list-item">
            ✓ {feature}
          </div>
        ))}
        <br />
        <strong>Pricing Model:</strong> {products.primaryOffering.pricing}
        <br />
        <strong>Target Customers:</strong> {products.primaryOffering.targetCustomers}
      </div>

      <h4>Additional Services</h4>
      {products.additionalServices.map((service, i) => (
        <div key={i} className="card" style={{ marginBottom: '1rem' }}>
          <h5 style={{ marginTop: 0 }}>{service.name}</h5>
          <p>{service.description}</p>
          <strong>Pricing:</strong> {service.pricing}
        </div>
      ))}

      <h4>Development Roadmap</h4>
      {Object.entries(products.developmentRoadmap).map(([phase, info]) => (
        <div key={phase} className="card" style={{ marginBottom: '1rem' }}>
          <strong>{phase.replace(/([A-Z])/g, ' $1')}:</strong> {info.timeline}
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            {info.deliverables.map((deliverable, i) => (
              <li key={i}>{deliverable}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function BusinessModelTab({ model }) {
  return (
    <div className="section">
      <h3>Business Model</h3>

      <h4>Revenue Streams</h4>
      {model.revenueStreams.map((stream, i) => (
        <div key={i} className="card" style={{ marginBottom: '1rem' }}>
          <h5 style={{ marginTop: 0 }}>{stream.name}</h5>
          <p>{stream.description}</p>
          <strong>Projection:</strong> {stream.projection}
        </div>
      ))}

      <h4>Cost Structure</h4>
      <div className="card">
        <strong>Cost of Revenue:</strong> {model.costStructure.costOfRevenue}
        <br /><br />
        <strong>Operating Expenses:</strong>
        {model.costStructure.operatingExpenses.map((expense, i) => (
          <div key={i} className="list-item" style={{ borderBottom: 'none' }}>
            • {expense}
          </div>
        ))}
      </div>

      <h4>Customer Acquisition</h4>
      <div className="card">
        <strong>Strategy:</strong> {model.customerAcquisition.strategy}
        <br />
        <strong>Expected CAC:</strong> {model.customerAcquisition.expectedCAC}
        <br />
        <strong>Expected LTV:</strong> {model.customerAcquisition.expectedLTV}
        <br />
        <strong>Payback Period:</strong> {model.customerAcquisition.paybackPeriod}
      </div>

      <h4>Partnerships</h4>
      {model.partnerships.map((partner, i) => (
        <div key={i} className="list-item">
          🤝 {partner}
        </div>
      ))}
    </div>
  );
}

function MarketingTab({ marketing }) {
  return (
    <div className="section">
      <h3>Marketing & Sales Strategy</h3>

      <h4>Positioning Statement</h4>
      <div className="card">
        {marketing.positioningStatement}
      </div>

      <h4>Target Strategy</h4>
      <div className="card">
        <strong>Primary:</strong> {marketing.targetingStrategy.primary}
        <br />
        <strong>Secondary:</strong> {marketing.targetingStrategy.secondary}
        <br />
        <strong>Messaging:</strong> {marketing.targetingStrategy.messaging}
      </div>

      <h4>Marketing Channels</h4>
      {marketing.marketingChannels.map((channel, i) => (
        <div key={i} className="card" style={{ marginBottom: '1rem' }}>
          <h5 style={{ marginTop: 0 }}>
            {channel.channel} ({channel.budget})
          </h5>
          {channel.tactics.map((tactic, j) => (
            <div key={j} className="list-item">
              {tactic}
            </div>
          ))}
        </div>
      ))}

      <h4>Sales Strategy</h4>
      <div className="card">
        <strong>Model:</strong> {marketing.salesStrategy.model}
        <br />
        <strong>Sales Cycle:</strong> {marketing.salesStrategy.salesCycle}
      </div>

      <h4>Customer Retention</h4>
      <div className="card">
        <strong>Target Retention Rate:</strong> {marketing.customerRetention.targetRetentionRate}
        <br /><br />
        <strong>Strategies:</strong>
        {marketing.customerRetention.strategies.map((strategy, i) => (
          <div key={i} className="list-item" style={{ borderBottom: 'none' }}>
            ✓ {strategy}
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationsTab({ operations }) {
  return (
    <div className="section">
      <h3>Operations Plan</h3>

      <p>{operations.overview}</p>

      <h4>Production Process</h4>
      {operations.productionProcess.map((item, i) => (
        <div key={i} className="list-item">
          ⚙️ {item}
        </div>
      ))}

      <h4>Facilities & Infrastructure</h4>
      <div className="card">
        <strong>Facilities:</strong> {operations.facilities}
      </div>

      <h4>Technology Stack</h4>
      <div className="card">
        <strong>Infrastructure:</strong> {operations.technology.infrastructure}
        <br />
        <strong>Development:</strong> {operations.technology.development}
        <br />
        <strong>Tools:</strong> {operations.technology.tools}
      </div>

      <h4>Staffing Plan</h4>
      <table className="table">
        <tbody>
          {Object.entries(operations.staffing)
            .filter(([key]) => key !== 'roles')
            .map(([key, value]) => (
              <tr key={key}>
                <td style={{ fontWeight: 600 }}>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h4>Quality Assurance</h4>
      {operations.qualityAssurance.map((qa, i) => (
        <div key={i} className="list-item">
          ✓ {qa}
        </div>
      ))}
    </div>
  );
}

function ManagementTab({ management }) {
  return (
    <div className="section">
      <h3>Management & Organization</h3>

      <h4>Key Personnel</h4>
      {management.keyPersonnel.map((person, i) => (
        <div key={i} className="card" style={{ marginBottom: '1rem' }}>
          <h5 style={{ marginTop: 0 }}>{person.position}</h5>
          <strong>Responsibility:</strong> {person.responsibility}
          <br />
          <strong>Qualifications:</strong> {person.qualifications}
        </div>
      ))}

      <h4>Board & Advisors</h4>
      <div className="card">
        <strong>Board Members:</strong>
        {management.organizationalStructure.board.map((member, i) => (
          <div key={i} className="list-item" style={{ borderBottom: 'none' }}>
            • {member}
          </div>
        ))}
        <br />
        <strong>Advisors:</strong>
        {management.advisors.map((advisor, i) => (
          <div key={i} className="list-item" style={{ borderBottom: 'none' }}>
            • {advisor}
          </div>
        ))}
      </div>

      <h4>Company Culture & Values</h4>
      {management.cultureValues.map((value, i) => (
        <div key={i} className="list-item">
          💡 {value}
        </div>
      ))}

      <h4>Board Governance</h4>
      <div className="card">
        {management.boardMeetings}
      </div>
    </div>
  );
}

function FinancialTab({ financial }) {
  return (
    <div className="section">
      <h3>Financial Projections</h3>

      <h4>Key Assumptions</h4>
      {Object.entries(financial.assumptions).map(([key, value]) => (
        <div key={key} className="list-item">
          <strong>{key}:</strong> {value}
        </div>
      ))}

      <h4>Revenue Projections</h4>
      {['year1', 'year2', 'year3'].map((year) => (
        <div key={year} className="card" style={{ marginBottom: '1rem' }}>
          <h5 style={{ marginTop: 0 }}>
            Year {year.replace('year', '')}
          </h5>
          <strong>Total Revenue:</strong> {financial.revenueProjections[year].total}
          <br />
          <table className="table" style={{ marginTop: '0.75rem' }}>
            <tbody>
              {Object.entries(
                financial.revenueProjections[year].breakdown
              ).map(([source, amount]) => (
                <tr key={source}>
                  <td>{source}</td>
                  <td>{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h4>Expense Projections</h4>
      {['year1', 'year2', 'year3'].map((year) => (
        <div key={year} className="list-item">
          <strong>{year.replace('year', 'Year ')}:</strong>{' '}
          {financial.expenseProjections[year]}
        </div>
      ))}

      <h4>Profitability Metrics</h4>
      <table className="table">
        <tbody>
          {Object.entries(financial.profitabilityMetrics).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 600 }}>
                {key.replace(/([A-Z])/g, ' $1')}
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FundingTab({ funding }) {
  return (
    <div className="section">
      <h3>Funding Requirements</h3>

      <h4>Total Funding Needed</h4>
      <div className="card">
        <strong style={{ fontSize: '1.3rem', color: '#3b82f6' }}>
          {funding.totalFundingNeeded}
        </strong>
      </div>

      <h4>Funding Allocation</h4>
      <div className="card">
        {Object.entries(funding.fundingAllocation).map(([category, percentage]) => (
          <div key={category} style={{ marginBottom: '1rem' }}>
            <strong>{category.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
            {percentage}
          </div>
        ))}
      </div>

      <h4>Seed Round Details</h4>
      <table className="table">
        <tbody>
          {Object.entries(funding.fundingRound).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 600 }}>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Use of Funds</h4>
      {funding.useOfFunds.map((use, i) => (
        <div key={i} className="card" style={{ marginBottom: '1rem' }}>
          <h5 style={{ marginTop: 0 }}>{use.category}</h5>
          <p>{use.description}</p>
          <strong>Allocation:</strong> {use.amount}
        </div>
      ))}

      <h4>Exit Strategy & Returns</h4>
      <div className="card">
        <strong>Exit Strategy:</strong> {funding.exitStrategy}
        <br />
        <strong>Investor Return Potential:</strong> {funding.investorReturn}
      </div>
    </div>
  );
}

function RiskTab({ risk }) {
  const renderRiskCategory = (title, risks) => (
    <>
      <h4>{title}</h4>
      {risks.map((item, i) => (
        <div key={i} className="card" style={{ marginBottom: '1rem' }}>
          <h5 style={{ marginTop: 0 }}>{item.risk}</h5>
          <strong>Likelihood:</strong>{' '}
          <span style={{ color: getLikelihoodColor(item.likelihood) }}>
            {item.likelihood}
          </span>
          <br />
          <strong>Impact:</strong>{' '}
          <span style={{ color: getImpactColor(item.impact) }}>
            {item.impact}
          </span>
          <br />
          <strong>Mitigation:</strong> {item.mitigation}
        </div>
      ))}
    </>
  );

  const getLikelihoodColor = (likelihood) => {
    switch (likelihood) {
      case 'Low':
        return '#10b981';
      case 'Medium':
        return '#f59e0b';
      case 'High':
        return '#ef4444';
      default:
        return 'inherit';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Low':
        return '#10b981';
      case 'Medium':
        return '#f59e0b';
      case 'High':
        return '#ef4444';
      case 'Critical':
        return '#dc2626';
      default:
        return 'inherit';
    }
  };

  return (
    <div className="section">
      <h3>Risk Analysis</h3>

      {renderRiskCategory('Market Risks', risk.marketRisks)}
      {renderRiskCategory('Operational Risks', risk.operationalRisks)}
      {renderRiskCategory('Financial Risks', risk.financialRisks)}
    </div>
  );
}

function GrowthTab({ growth }) {
  const renderGoals = (year, goals) => (
    <>
      <h4>{year}</h4>
      {goals.map((goal, i) => (
        <div key={i} className="list-item">
          ✓ {goal}
        </div>
      ))}
    </>
  );

  return (
    <div className="section">
      <h3>Growth Strategy</h3>

      {renderGoals('Year 1 Goals', growth.year1Goals)}
      {renderGoals('Year 2 Goals', growth.year2Goals)}
      {renderGoals('Year 3 Goals', growth.year3Goals)}

      <h4>Expansion Strategy</h4>
      <table className="table">
        <tbody>
          {Object.entries(growth.expansionStrategy).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 600 }}>
                {key.replace(/([A-Z])/g, ' $1')}
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Strategic Initiatives</h4>
      {growth.strategicInitiatives.map((initiative, i) => (
        <div key={i} className="list-item">
          🎯 {initiative}
        </div>
      ))}
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
