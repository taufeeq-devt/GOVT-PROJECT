import React from 'react';
import { ArrowLeft } from 'lucide-react';

function AuthWrapper({ children, goBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-dark-card/90 to-dark-surface/90 rounded-3xl p-10 w-full max-w-lg shadow-2xl border border-slate-700 backdrop-blur-2xl">
        <button 
          onClick={goBack}
          className="mb-8 flex items-center gap-2 text-accent-gold hover:text-accent-teal transition-colors font-semibold"
        >
          <ArrowLeft size={22} />
          Back to Home
        </button>
        {children}
      </div>
    </div>
  );
}

export default AuthWrapper; 