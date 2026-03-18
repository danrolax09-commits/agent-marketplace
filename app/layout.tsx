import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agent Marketplace - Buy & Sell AI Agents',
  description: 'The leading marketplace for autonomous AI agents. Browse, buy, and deploy agents for any task.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">AgentHub</div>
            <div className="nav-links">
              <a href="/">Browse</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/sell">Sell Agent</a>
              <a href="/account">Account</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
