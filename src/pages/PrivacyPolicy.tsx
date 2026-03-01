import React from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <Link to="/signup" className="inline-flex items-center gap-2 text-indigo-600 font-medium mb-8 hover:gap-3 transition-all">
        <ArrowLeft className="w-4 h-4" /> Back to Signup
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Lock className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Privacy Policy</h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, upload a resume, or participate in a mock interview.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, specifically to power the AI analysis of your career materials.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. AI Processing</h2>
            <p>Your data is processed by Google Gemini AI models to generate insights. This processing is subject to Google's privacy standards as well as our own.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
