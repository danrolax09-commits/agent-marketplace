import React from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  sales: number;
  image: string;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'SEO Analyzer Pro',
    description: 'Analyzes websites and generates SEO optimization reports',
    category: 'Content',
    price: 5.99,
    rating: 4.8,
    sales: 324,
    image: '🔍',
  },
  {
    id: '2',
    name: 'Email Outreach Bot',
    description: 'Sends personalized cold emails and tracks responses',
    category: 'Sales',
    price: 9.99,
    rating: 4.9,
    sales: 512,
    image: '📧',
  },
  {
    id: '3',
    name: 'Social Media Manager',
    description: 'Creates, schedules, and analyzes social media posts',
    category: 'Marketing',
    price: 7.99,
    rating: 4.7,
    sales: 287,
    image: '📱',
  },
  {
    id: '4',
    name: 'Research Assistant',
    description: 'Performs web research and compiles comprehensive reports',
    category: 'Research',
    price: 8.99,
    rating: 4.9,
    sales: 445,
    image: '📚',
  },
  {
    id: '5',
    name: 'Data Scraper',
    description: 'Extracts and organizes data from websites automatically',
    category: 'Automation',
    price: 6.99,
    rating: 4.6,
    sales: 198,
    image: '⚙️',
  },
  {
    id: '6',
    name: 'Customer Support AI',
    description: 'Handles customer inquiries and resolves common issues',
    category: 'Support',
    price: 12.99,
    rating: 4.8,
    sales: 678,
    image: '💬',
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>The AI Agent Marketplace</h1>
          <p>Deploy autonomous agents for any task. Browse hundreds of production-ready automations.</p>
          <div style={{ marginTop: '2rem' }}>
            <button className="btn btn-primary">Browse Agents</button>
            <button className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
              Sell Your Agent
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container" style={{ margin: '3rem auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center' }}>
        <div>
          <h3 style={{ fontSize: '2rem', color: '#0066cc' }}>2,847</h3>
          <p>Active Agents</p>
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', color: '#0066cc' }}>$1.2M+</h3>
          <p>Total Revenue</p>
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', color: '#0066cc' }}>12,500+</h3>
          <p>Users</p>
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', color: '#0066cc' }}>98%</h3>
          <p>Uptime</p>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="container">
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Featured Agents</h2>
        <div className="grid">
          {mockAgents.map((agent) => (
            <div key={agent.id} className="card">
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{agent.image}</div>
              <h3>{agent.name}</h3>
              <p>{agent.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span className="badge">{agent.category}</span>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>⭐ {agent.rating}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span className="price">${agent.price}</span>
                <span style={{ fontSize: '0.85rem', color: '#999' }}>{agent.sales} sales</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Get Agent
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>How It Works</h2>
        <div className="grid">
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
            <h3>Browse</h3>
            <p>Explore thousands of AI agents by category, rating, and price.</p>
          </div>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💳</div>
            <h3>Purchase</h3>
            <p>Buy agents with secure Stripe checkout. Instant access.</p>
          </div>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
            <h3>Deploy</h3>
            <p>Deploy to your infrastructure with API keys and webhooks.</p>
          </div>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
            <h3>Monitor</h3>
            <p>Track performance, usage, and earnings in real-time.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0066cc', color: 'white', padding: '3rem 2rem', textAlign: 'center', marginTop: '4rem' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Ready to Automate?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.95 }}>
            Join 12,500+ users automating their workflows with AI agents.
          </p>
          <button className="btn btn-secondary">Get Started Free</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Agent Marketplace. All rights reserved. | Made for autonomous builders.</p>
      </footer>
    </main>
  );
}
