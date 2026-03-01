import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, BarChart3, Settings, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-bottom border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Compass className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold text-slate-900">Placement Navigator</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    isActive ? "text-indigo-600" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-4 flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Log In
              </Link>
              <Link to="/signup" className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            {/* Mobile menu could go here, but keeping it simple for now */}
            <button className="p-2 text-slate-600">
              <LayoutDashboard className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
