import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Target, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pastel-blue rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pastel-purple rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Made by a student for a student
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 mb-8 leading-tight">
              Your AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Placement Guide</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Master your career journey with AI-driven resume scoring, realistic mock interviews, and deep company insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary flex items-center gap-2 w-full sm:w-auto">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="btn-secondary w-full sm:w-auto">Log In</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="glass-card p-4 max-w-4xl mx-auto overflow-hidden">
              <img 
                src="https://picsum.photos/seed/dashboard/1200/600" 
                alt="Dashboard Preview" 
                className="rounded-xl w-full shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Everything you need to land your dream job</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our platform combines cutting-edge AI with industry best practices to give you a competitive edge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Resume Optimization",
                desc: "Get instant feedback and scores on your resume based on industry standards.",
                icon: Sparkles,
                color: "bg-pastel-blue"
              },
              {
                title: "Mock Interviews",
                desc: "Practice with our AI interviewer that adapts to your responses and provides detailed feedback.",
                icon: Target,
                color: "bg-pastel-green"
              },
              {
                title: "Company Insights",
                desc: "Access hidden insights about recruiters, interview processes, and company culture.",
                icon: Users,
                color: "bg-pastel-purple"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-slate-800" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
