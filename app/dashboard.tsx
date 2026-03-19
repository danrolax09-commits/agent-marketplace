// V3 Feature: Seller Dashboard
'use client';

import React, { useState } from 'react';

export default function SellerDashboard() {
  const [timeframe, setTimeframe] = useState('7days');

  const stats = {
    totalSales: 12847,
    revenue: 45230,
    activeListings: 8,
    avgRating: 4.8,
    thisMonthRevenue: 8900,
    thisMonthSales: 1200,
  };

  const recentSales = [
    { id: 1, product: 'SEO Analyzer Pro', buyer: 'acme-co', amount: 5.99, date: '2 hours ago' },
    { id: 2, product: 'Email Outreach Bot', buyer: 'startup-xyz', amount: 9.99, date: '4 hours ago' },
    { id: 3, product: 'Content Writer Pro', buyer: 'marketing-pro', amount: 14.99, date: '6 hours ago' },
    { id: 4, product: 'Code Generator', buyer: 'dev-team', amount: 19.99, date: '1 day ago' },
    { id: 5, product: 'Data Scraper', buyer: 'researcher-ai', amount: 6.99, date: '1 day ago' },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>💰 Seller Dashboard</h1>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: '#1a1f2e', padding: '1.5rem', borderRadius: '8px', border: '1px solid #2d3748' }}>
          <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>This Month Revenue</div>
          <div style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold', marginTop: '0.5rem' }}>
            ${stats.thisMonthRevenue.toLocaleString()}
          </div>
          <div style={{ color: '#a0aec0', fontSize: '0.85rem', marginTop: '0.5rem' }}>+23% vs last month</div>
        </div>

        <div style={{ background: '#1a1f2e', padding: '1.5rem', borderRadius: '8px', border: '1px solid #2d3748' }}>
          <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Total Sales</div>
          <div style={{ fontSize: '2rem', color: '#00d4ff', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {stats.thisMonthSales.toLocaleString()}
          </div>
          <div style={{ color: '#a0aec0', fontSize: '0.85rem', marginTop: '0.5rem' }}>This month</div>
        </div>

        <div style={{ background: '#1a1f2e', padding: '1.5rem', borderRadius: '8px', border: '1px solid #2d3748' }}>
          <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Active Listings</div>
          <div style={{ fontSize: '2rem', color: '#f59e0b', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {stats.activeListings}
          </div>
          <div style={{ color: '#a0aec0', fontSize: '0.85rem', marginTop: '0.5rem' }}>Ready to sell</div>
        </div>

        <div style={{ background: '#1a1f2e', padding: '1.5rem', borderRadius: '8px', border: '1px solid #2d3748' }}>
          <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Avg Rating</div>
          <div style={{ fontSize: '2rem', color: '#ec4899', fontWeight: 'bold', marginTop: '0.5rem' }}>
            ⭐ {stats.avgRating}
          </div>
          <div style={{ color: '#a0aec0', fontSize: '0.85rem', marginTop: '0.5rem' }}>From 1,200+ reviews</div>
        </div>
      </div>

      {/* Recent Sales */}
      <div style={{ background: '#1a1f2e', borderRadius: '8px', border: '1px solid #2d3748', padding: '1.5rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Recent Sales</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2d3748' }}>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Product</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#a0aec0' }}>Buyer</th>
              <th style={{ textAlign: 'right', padding: '1rem', color: '#a0aec0' }}>Amount</th>
              <th style={{ textAlign: 'right', padding: '1rem', color: '#a0aec0' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale.id} style={{ borderBottom: '1px solid #2d3748' }}>
                <td style={{ padding: '1rem' }}>{sale.product}</td>
                <td style={{ padding: '1rem', color: '#a0aec0' }}>{sale.buyer}</td>
                <td style={{ textAlign: 'right', padding: '1rem', color: '#10b981', fontWeight: 'bold' }}>
                  +${sale.amount}
                </td>
                <td style={{ textAlign: 'right', padding: '1rem', color: '#a0aec0', fontSize: '0.9rem' }}>
                  {sale.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '2rem', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '1rem' }}>💡 Optimization Tips</h3>
        <ul style={{ lineHeight: '1.8', opacity: 0.95 }}>
          <li>✓ Your "Code Generator" agent is trending. Consider promoting similar products.</li>
          <li>✓ Content Writer Pro has 892 sales - highest performer this month.</li>
          <li>✓ Upgrade to Featured listing ($99/month) to get 10x more exposure.</li>
          <li>✓ Create bundle deals (3 products for discounted rate) to increase AOV.</li>
        </ul>
      </div>
    </div>
  );
}
