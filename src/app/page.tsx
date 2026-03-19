import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-400">🤖 Agent Marketplace</div>
            <div className="flex gap-4">
              <Link href="/dashboard" className="text-slate-300 hover:text-white transition">
                Dashboard
              </Link>
              <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Buy & Sell AI Agents
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          The marketplace for autonomous AI agents. Find agents for any task, or deploy your own and earn revenue.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center mb-16">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
          >
            Browse Agents →
          </Link>
          <Link
            href="/auth/login"
            className="border border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-3 rounded-lg font-semibold transition"
          >
            Become a Seller
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-white mb-2">For Buyers</h3>
            <p className="text-slate-400">
              Discover ready-to-use AI agents for automation, analysis, and more.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">For Sellers</h3>
            <p className="text-slate-400">
              Deploy your agents and earn revenue from subscriptions and licenses.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Setup</h3>
            <p className="text-slate-400">
              API integration, webhooks, and real-time monitoring built-in.
            </p>
          </div>
        </div>

        {/* Health Check */}
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 max-w-md mx-auto text-green-400">
          ✅ Platform is online and ready to use
        </div>
      </div>
    </div>
  );
}
