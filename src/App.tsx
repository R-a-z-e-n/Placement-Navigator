import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import MockInterview from './pages/MockInterview';
import CompanyInsights from './pages/CompanyInsights';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/resume" element={<ResumeBuilder />} />
                  <Route path="/interview" element={<MockInterview />} />
                  <Route path="/insights" element={<CompanyInsights />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
              <footer className="py-12 border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                  <p className="text-slate-500 text-sm">
                    © 2026 Placement Navigator. Built with Gemini AI for career success.
                  </p>
                </div>
              </footer>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}
