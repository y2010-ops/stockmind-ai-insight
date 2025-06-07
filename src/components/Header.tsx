
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, User, Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="gradient-primary p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">StockMind</h1>
              <p className="text-xs text-gray-400">AI Stock Assistant</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Analytics
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Alerts
            </a>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <User className="h-4 w-4" />
            </Button>
            <Button className="gradient-primary text-white border-0 hover:opacity-90">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
