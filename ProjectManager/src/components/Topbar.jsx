import React, { useState } from 'react';
import { Bell, User, LogOut, Settings, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload(); // or navigate('/login')
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate('/profile');
  };

  const handleSettings = () => {
    setDropdownOpen(false);
    navigate('/settings');
  };

  return (
    <header className="fixed top-0 left-80 right-0 z-20 h-20 flex items-center px-8 glass border-b border-border">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full py-2 pl-10 pr-4 rounded-lg bg-accent/10 text-text placeholder:text-accent/80 focus:outline-none focus:ring-2 focus:ring-accent/20 shadow-card transition-all duration-200"
          />
          <Search className="absolute left-3 top-2.5 text-accent" size={20} />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-accent/10 transition shadow-card">
          <Bell className="text-primary" size={22} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full border-2 border-card" />
        </button>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
          >
            <User className="text-primary" size={22} />
            <span className="font-semibold text-text">Project Manager</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50">
              <button
                onClick={handleProfile}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-primary hover:bg-accent/10 rounded-t-xl"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={handleSettings}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-primary hover:bg-accent/10"
              >
                <Settings size={16} /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error hover:bg-error/10 rounded-b-xl"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar; 