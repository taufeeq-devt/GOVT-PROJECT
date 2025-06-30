import React from 'react';
import { Shield, User } from 'lucide-react';
import styles from './styles.module.css';

const Header = () => (
  <nav className={`flex justify-between items-center px-10 py-6 bg-gradient-to-r from-dark-bg via-dark-surface to-dark-bg shadow-lg border-b border-slate-700 rounded-b-3xl ${styles.nav}`}>
    <div className="flex items-center gap-4 text-main">
      <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/30 to-accent-teal/30 rounded-2xl flex items-center justify-center border border-accent-gold/30">
        <Shield size={28} className="text-accent-gold" />
      </div>
      <span className={`text-2xl font-extrabold tracking-widest text-accent-gold ml-4 ${styles.logo}`}>SecurePortal</span>
    </div>
    <button className={`flex items-center gap-3 bg-gradient-to-r from-accent-gold to-accent-teal text-dark-bg px-10 py-4 rounded-2xl font-bold text-lg hover:from-accent-teal hover:to-accent-gold transition-all hover:-translate-y-1 shadow-xl border-2 border-accent-gold/50 ${styles.accountBtn}`}>
      <User size={24} />
      <span className="font-bold">Account</span>
    </button>
  </nav>
);

export default Header; 