import React from 'react';
import { Shield, Instagram, Linkedin, Twitter } from 'lucide-react';
import styles from './styles.module.css';

const Footer = () => (
  <footer className={`bg-gradient-to-r from-dark-bg via-dark-surface to-dark-bg text-main py-16 border-t border-slate-700 mt-24 rounded-t-3xl shadow-2xl ${styles.footer}`}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/30 to-accent-teal/30 rounded-2xl flex items-center justify-center border border-accent-gold/30">
              <Shield size={28} className="text-accent-gold" />
            </div>
            <span className="text-2xl font-extrabold tracking-widest text-accent-gold">SecurePortal</span>
          </div>
          <p className="text-text-secondary leading-relaxed max-w-xs">
            Connecting suppliers, government, and contractors through secure digital solutions.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent-gold">Quick Links</h3>
          <div className="space-y-2">
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>About Us</a>
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>Services</a>
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>Contact</a>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent-gold">Support</h3>
          <div className="space-y-2">
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>Help Center</a>
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>Documentation</a>
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>Privacy Policy</a>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent-gold">Connect</h3>
          <div className="space-y-2">
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>Newsletter</a>
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>Community</a>
            <a href="#" className={`block text-text-secondary hover:text-accent-teal transition-colors text-base ${styles.link}`}>Updates</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-700 gap-6">
        <p className="text-text-secondary text-base">© 2025 SecurePortal. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className={`w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-teal rounded-2xl flex items-center justify-center text-dark-bg hover:from-accent-teal hover:to-accent-gold transition-all shadow-xl hover:scale-110 ${styles.iconBtn}`} aria-label="Instagram">
            <Instagram size={28} />
          </a>
          <a href="#" className={`w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-teal rounded-2xl flex items-center justify-center text-dark-bg hover:from-accent-teal hover:to-accent-gold transition-all shadow-xl hover:scale-110 ${styles.iconBtn}`} aria-label="X">
            <Twitter size={28} />
          </a>
          <a href="#" className={`w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-teal rounded-2xl flex items-center justify-center text-dark-bg hover:from-accent-teal hover:to-accent-gold transition-all shadow-xl hover:scale-110 ${styles.iconBtn}`} aria-label="LinkedIn">
            <Linkedin size={28} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 