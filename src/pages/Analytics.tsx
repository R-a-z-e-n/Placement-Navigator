import React from 'react';
import { BarChart3, TrendingUp, Target, Award, ExternalLink } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Your Analytics</h1>
          <p className="text-slate-600">Track your growth and performance over time.</p>
        </div>
        <a 
          href="https://us.i.posthog.com/project/phc_H8efCrcQAmD8B4OQqyI3uYIp54IubWzBjbbNDx6VHZI" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-2 w-fit"
        >
          <ExternalLink className="w-4 h-4" /> View PostHog Dashboard
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Avg Resume Score", value: "82", icon: Target, color: "text-blue-600" },
          { label: "Interviews Done", value: "14", icon: TrendingUp, color: "text-green-600" },
          { label: "Success Rate", value: "68%", icon: Award, color: "text-purple-600" },
          { label: "Insights Unlocked", value: "24", icon: BarChart3, color: "text-amber-600" }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-green-500">+12%</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <p className="text-3xl font-display font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 h-96 flex items-center justify-center text-slate-400">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>Detailed activity charts will appear here as you use the platform.</p>
        </div>
      </div>
    </div>
  );
}
