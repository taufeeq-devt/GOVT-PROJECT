import React from 'react';
import { Shield } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#101624] via-[#162032] to-[#1a2233]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="animate-spin-slow absolute inset-0 rounded-full border-8 border-[#1de9b6]/30 border-t-[#ffd580] border-b-[#1de9b6]" style={{ width: 96, height: 96 }} />
          <div className="w-24 h-24 bg-gradient-to-br from-[#ffd580]/80 to-[#1de9b6]/80 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Shield size={48} className="text-[#101624] drop-shadow-lg" />
          </div>
        </div>
        <span className="text-xl text-[#ffd580] font-bold tracking-widest animate-fade-in">Secure Portal</span>
      </div>
      <style>{`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 2s linear infinite; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1.2s ease-in; }
      `}</style>
    </div>
  );
}

export default LoadingScreen; 