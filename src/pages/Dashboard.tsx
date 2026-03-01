import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, Search, TrendingUp, Award, Clock, X, Calendar, CheckCircle2 } from 'lucide-react';

const cards = [
  {
    title: "Resume Builder",
    desc: "Upload and analyze your resume with AI",
    icon: FileText,
    path: "/resume",
    color: "bg-pastel-blue",
    stats: "Score: 85/100"
  },
  {
    title: "Mock Interview",
    desc: "Practice with our adaptive AI interviewer",
    icon: MessageSquare,
    path: "/interview",
    color: "bg-pastel-green",
    stats: "3 Sessions completed"
  },
  {
    title: "Company Insights",
    desc: "Search for recruiter info and company culture",
    icon: Search,
    path: "/insights",
    color: "bg-pastel-purple",
    stats: "12 Companies tracked"
  }
];

export default function Dashboard() {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-slate-900">Welcome back, Alex!</h1>
        <p className="text-slate-600">Here's your placement preparation progress.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={card.path} className="block group">
              <div className="glass-card p-6 h-full hover:shadow-xl transition-all border-transparent hover:border-indigo-100">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6 text-slate-800" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{card.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.stats}</span>
                  <div className="text-indigo-600 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" /> Recent Achievements
            </h3>
            <button 
              onClick={() => setShowAchievementsModal(true)}
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: "Resume Score Improved", date: "2 days ago", icon: TrendingUp },
              { title: "Mock Interview Ace", date: "5 days ago", icon: Award },
              { title: "Google Insights Unlocked", date: "1 week ago", icon: Search }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <item.icon className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" /> Upcoming Sessions
            </h3>
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              Schedule
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-indigo-600 text-white">
              <p className="text-sm opacity-80 mb-1">Tomorrow, 10:00 AM</p>
              <h4 className="text-lg font-bold mb-4">Mock Interview: Senior Frontend Engineer</h4>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-400 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <span className="text-xs opacity-80">+ 12 others practicing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScheduleModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card p-8 bg-white shadow-2xl"
            >
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-indigo-600" /> Schedule Session
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Date</label>
                  <input 
                    type="date" 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Session Type</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>Mock Interview</option>
                    <option>Resume Review</option>
                    <option>Career Counseling</option>
                  </select>
                </div>
                <button 
                  onClick={() => {
                    alert("Session scheduled successfully!");
                    setShowScheduleModal(false);
                  }}
                  className="btn-primary w-full mt-4"
                >
                  Confirm Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Achievements Modal */}
      <AnimatePresence>
        {showAchievementsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAchievementsModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-card p-8 bg-white shadow-2xl overflow-y-auto max-h-[80vh]"
            >
              <button 
                onClick={() => setShowAchievementsModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-indigo-600" /> All Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Resume Score Improved", date: "2 days ago", icon: TrendingUp, desc: "Your resume score jumped from 72 to 85." },
                  { title: "Mock Interview Ace", date: "5 days ago", icon: Award, desc: "Scored 90% in a technical interview simulation." },
                  { title: "Google Insights Unlocked", date: "1 week ago", icon: Search, desc: "Explored deep insights for Google recruitment." },
                  { title: "First Resume Uploaded", date: "2 weeks ago", icon: FileText, desc: "Started your journey by uploading your first resume." },
                  { title: "Profile Completed", date: "2 weeks ago", icon: CheckCircle2, desc: "Filled out all profile details for better AI matching." }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                      <item.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mb-1">{item.date}</p>
                      <p className="text-sm text-slate-600 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
