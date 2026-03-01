import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Terms of Service</h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Placement Navigator, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Use License</h2>
            <p>Permission is granted to temporarily use the AI-powered tools on Placement Navigator for personal, non-commercial placement preparation purposes only.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. AI Content Disclaimer</h2>
            <p>Placement Navigator uses artificial intelligence to provide feedback and insights. While we strive for accuracy, the AI-generated content should be used as a guide and not as absolute professional advice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. User Data</h2>
            <p>We respect your privacy. Your resume data and interview transcripts are processed to provide you with feedback and are handled according to our Privacy Policy.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
