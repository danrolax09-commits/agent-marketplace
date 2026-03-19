"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// V4: User Dashboard
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, agentsRes] = await Promise.all([
          fetch("/api/subscription"),
          fetch("/api/user-agents"),
        ]);

        if (subRes.ok) setSubscription(await subRes.json());
        if (agentsRes.ok) setAgents(await agentsRes.json());
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchData();
    }
  }, [session]);

  if (status === "loading" || loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back, {session?.user?.name}!</p>
        </div>

        {/* Subscription Status */}
        {subscription && (
          <div className="bg-slate-700 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Subscription</h2>
                <p className="text-slate-300">
                  Current Plan: <span className="font-semibold capitalize">{subscription.tier}</span>
                </p>
              </div>
              {subscription.tier === "free" && (
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition">
                  Upgrade
                </button>
              )}
            </div>
          </div>
        )}

        {/* Your Agents */}
        <div className="bg-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Your Agents ({agents.length})</h2>
          {agents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">You haven't listed any agents yet</p>
              <a href="/sell" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition inline-block">
                List Your First Agent
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {agents.map((agent: any) => (
                <div key={agent.id} className="bg-slate-600 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{agent.name}</h3>
                    <p className="text-slate-300 text-sm">${agent.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">{agent.sales || 0} sales</p>
                    <p className="text-lg font-bold text-green-400">${agent.revenue || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
