// V3 Feature: Advanced Search & Filtering
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { query, filters, sortBy } = await request.json();

  // Mock search results with filters
  const allAgents = [
    { id: '1', name: 'SEO Analyzer Pro', category: 'Content', price: 5.99, rating: 4.8, sales: 324 },
    { id: '2', name: 'Email Outreach Bot', category: 'Sales', price: 9.99, rating: 4.9, sales: 512 },
    { id: '3', name: 'Social Media Manager', category: 'Marketing', price: 7.99, rating: 4.7, sales: 287 },
    { id: '4', name: 'Content Writer Pro', category: 'Content', price: 14.99, rating: 4.9, sales: 892 },
    { id: '5', name: 'Code Generator', category: 'Development', price: 19.99, rating: 4.9, sales: 723 },
  ];

  let results = allAgents;

  // Apply text search
  if (query) {
    results = results.filter(
      agent =>
        agent.name.toLowerCase().includes(query.toLowerCase()) ||
        agent.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Apply category filter
  if (filters?.category) {
    results = results.filter(agent => agent.category === filters.category);
  }

  // Apply price range filter
  if (filters?.minPrice || filters?.maxPrice) {
    results = results.filter(
      agent =>
        (!filters.minPrice || agent.price >= filters.minPrice) &&
        (!filters.maxPrice || agent.price <= filters.maxPrice)
    );
  }

  // Apply rating filter
  if (filters?.minRating) {
    results = results.filter(agent => agent.rating >= filters.minRating);
  }

  // Apply sorting
  if (sortBy === 'price-asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    results.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'sales') {
    results.sort((a, b) => b.sales - a.sales);
  }

  return NextResponse.json({
    total: results.length,
    results,
    filters: {
      query,
      ...filters,
      sortBy,
    },
  });
}
