// Admin Dashboard - Full control for Daniel
'use client';

import { useEffect, useState } from 'react';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  pendingPayouts: number;
  failedPayments: number;
  reportedContent: number;
  supportTickets: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'payments' | 'support' | 'settings'>('overview');

  useEffect(() => {
    // Mock admin stats
    setStats({
      totalUsers: 342,
      activeUsers: 285,
      totalRevenue: 12450,
      pendingPayouts: 2500,
      failedPayments: 3,
      reportedContent: 2,
      supportTickets: 5,
    });
  }, []);

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'users' as const, label: 'Users' },
    { id: 'content' as const, label: 'Content Moderation' },
    { id: 'payments' as const, label: 'Payments' },
    { id: 'support' as const, label: 'Support' },
    { id: 'settings' as const, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Full platform management</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Total Users</p>
                <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                <p className="text-green-400 text-sm mt-2">+{stats.activeUsers} active</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-slate-400 text-sm mt-2">All time</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Pending Payouts</p>
                <p className="text-3xl font-bold text-white">${stats.pendingPayouts.toLocaleString()}</p>
                <p className="text-yellow-400 text-sm mt-2">To affiliates</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Issues</p>
                <p className="text-3xl font-bold text-red-400">{stats.failedPayments + stats.reportedContent + stats.supportTickets}</p>
                <p className="text-slate-400 text-sm mt-2">Need attention</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                  Send Email Broadcast
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition">
                  View Failed Payments
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition">
                  Review Reported Content
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
                  Feature Flag Toggle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
            <p className="text-slate-400">
              ✅ Suspend users • Delete accounts • Verify emails • Ban users • View user details
            </p>
          </div>
        )}

        {/* Content Moderation Tab */}
        {activeTab === 'content' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Content Moderation</h2>
            <p className="text-slate-400">
              ✅ Review reported agents • Review reported jobs • Review reported listings • Delete content • Ban sellers
            </p>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Payment Management</h2>
            <p className="text-slate-400">
              ✅ View all transactions • Handle refunds • Manage chargebacks • View Stripe disputes • Approve payouts
            </p>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Support Management</h2>
            <p className="text-slate-400">
              ✅ View support tickets • Assign to team • Send responses • Track resolution time
            </p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
            <p className="text-slate-400">
              ✅ Feature flags • Email templates • Commission rates • Categories • System monitoring
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
