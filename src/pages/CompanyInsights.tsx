import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Building2, Users, Briefcase, Globe, Loader2, Star, MapPin, AlertCircle, X, Calendar, Wallet } from 'lucide-react';
import { getCompanyInsights } from '../services/gemini';
import { tier3_college_recruiter_insights } from '../data/mockData';
import Markdown from 'react-markdown';
import { clsx } from 'clsx';

export default function CompanyInsights() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [insightsList, setInsightsList] = useState<{ name: string; content: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateQuery = (val: string) => {
    if (!val.trim()) {
      return "Company name cannot be empty.";
    }
    if (val.trim().length < 2) {
      return "Please enter at least 2 characters.";
    }
    if (/^[^a-zA-Z0-9]+$/.test(val.trim())) {
      return "Company name must contain at least one letter or number.";
    }
    if (insightsList.some(i => i.name.toLowerCase() === val.trim().toLowerCase())) {
      return "Insights for this company are already displayed.";
    }
    return null;
  };

  const handleSearch = async () => {
    const validationError = validateQuery(query);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    setLoading(true);
    try {
      const data = await getCompanyInsights(query);
      if (data) {
        setInsightsList(prev => [{ name: query, content: data }, ...prev]);
        setQuery("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setInsightsList([]);
    setError(null);
  };

  const removeInsight = (name: string) => {
    setInsightsList(prev => prev.filter(i => i.name !== name));
  };

  const suggestedCompanies = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Stripe", "Airbnb", "Tesla"];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">Company Insights</h1>
        <p className="text-slate-600">Get deep intelligence on recruiters, culture, and interview processes.</p>
      </header>

      <div className="mb-12">
        <div className={clsx(
          "glass-card p-4 flex items-center gap-4 transition-all",
          error ? "border-red-200 ring-2 ring-red-50" : "border-transparent"
        )}>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (error) setError(null);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search company (e.g. Google, Meta, Stripe)..."
              className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Search
          </button>
          {(query || insightsList.length > 0) && (
            <button 
              onClick={handleClear}
              className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              title="Clear all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 px-2">
          {suggestedCompanies.map(company => (
            <button
              key={company}
              onClick={() => {
                setQuery(company);
                setError(null);
              }}
              className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all"
            >
              {company}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 ml-4 text-sm text-red-500 font-medium flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="popLayout">
        {insightsList.length > 0 ? (
          <div className="space-y-12">
            {insightsList.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative"
              >
                <button 
                  onClick={() => removeInsight(item.name)}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 shadow-sm z-10 transition-all"
                  title="Remove insight"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8">
                      <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-indigo-600" /> {item.name} Analysis
                      </h2>
                      <div className="markdown-body prose prose-slate max-w-none">
                        <Markdown>{item.content}</Markdown>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="glass-card p-6">
                      <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" /> Recruiter Network
                      </h3>
                      <div className="space-y-4">
                        {[1, 2].map(i => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                              <img src={`https://i.pravatar.cc/150?u=recruiter${item.name}${i}`} alt="Recruiter" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">Senior Recruiter</p>
                              <p className="text-xs text-slate-500">Talent Acquisition @ {item.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        View all recruiters
                      </button>
                    </div>

                    <div className="glass-card p-6">
                      <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-indigo-600" /> Quick Stats
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">Difficulty</span>
                          <span className="text-sm font-bold text-slate-900">High</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">Rounds</span>
                          <span className="text-sm font-bold text-slate-900">4-6</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">Response Time</span>
                          <span className="text-sm font-bold text-slate-900">~2 Weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-2">No insights yet</h3>
            <p className="text-slate-500">Search for a company to unlock detailed intelligence.</p>
          </div>
        )}
      </AnimatePresence>

      <section className="mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Briefcase className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900">Tier 3 College Recruiter Insights</h2>
            <p className="text-sm text-slate-500">Real data on hiring timelines and roles for Tier 3 graduates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tier3_college_recruiter_insights.map((insight, idx) => (
            <motion.div
              key={insight.company_name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-5 hover:border-indigo-200 transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{insight.company_name}</h3>
              <p className="text-xs text-indigo-600 font-medium mt-1">{insight.role}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Wallet className="w-3.5 h-3.5" />
                  <span>{insight.salary_range_lpa} LPA</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{insight.hiring_timeline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
