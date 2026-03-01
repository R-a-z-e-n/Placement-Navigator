import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, CheckCircle2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Settings() {
  const [editing, setEditing] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  // User data state
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Software Engineering Student",
    notifications: true,
    privacy: "Public"
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleEdit = (title: string) => {
    setTempData({ ...userData });
    setEditing(title);
  };

  const handleSave = (title: string) => {
    setEditing("saving");
    setTimeout(() => {
      setUserData({ ...tempData });
      setEditing(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setEditing(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600">Manage your account and preferences.</p>
      </header>

      <div className="space-y-6">
        {/* Profile Information */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm">
                <User className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900">Profile Information</h3>
                <p className="text-sm text-slate-500">Update your personal details and resume</p>
              </div>
            </div>
            {editing !== "Profile Information" ? (
              <button 
                onClick={() => handleEdit("Profile Information")}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCancel}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleSave("Profile Information")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              {editing === "Profile Information" ? (
                <input 
                  type="text" 
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  value={tempData.name}
                  onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                />
              ) : (
                <p className="text-slate-900 font-medium">{userData.name}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              {editing === "Profile Information" ? (
                <input 
                  type="email" 
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  value={tempData.email}
                  onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                />
              ) : (
                <p className="text-slate-900 font-medium">{userData.email}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role / Headline</label>
              {editing === "Profile Information" ? (
                <input 
                  type="text" 
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  value={tempData.role}
                  onChange={(e) => setTempData({ ...tempData, role: e.target.value })}
                />
              ) : (
                <p className="text-slate-900 font-medium">{userData.role}</p>
              )}
            </div>
          </div>
        </div>

        {/* Other settings - simplified for now but functional */}
        {[
          { title: "Notifications", desc: "Manage how you receive alerts and updates", icon: Bell },
          { title: "Privacy & Security", desc: "Control your data and account security", icon: Shield },
          { title: "Billing & Subscription", desc: "Manage your plan and payment methods", icon: CreditCard }
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm">
                <item.icon className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
            <button 
              onClick={() => handleSave(item.title)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900 text-white rounded-full shadow-2xl flex items-center gap-3 z-50"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Settings updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {editing === "saving" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold text-slate-900">Saving changes...</p>
          </div>
        </div>
      )}
    </div>
  );
}
