import React from 'react';
import styles from './styles.module.css';

function GovtLogin({ goBack, goToSignUp, govtRole }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div className="text-main">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 text-4xl">🏛️</div>
        <h2 className="text-2xl font-bold text-accent-teal mb-2 drop-shadow">{(govtRole ? govtRole.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' ' : '') + 'Official Login'}</h2>
        <p className="text-base text-accent-gold mb-2">Government officials log in here</p>
      </div>
      <form className="space-y-6">
        <div>
          <label className="block text-base font-semibold text-accent-teal mb-1">Email</label>
          <input type="email" className="w-full px-5 py-4 border border-accent-teal/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-teal focus:border-accent-teal text-lg" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
        </div>
        <div>
          <label className="block text-base font-semibold text-accent-teal mb-1">Password</label>
          <input type="password" className="w-full px-5 py-4 border border-accent-teal/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-teal focus:border-accent-teal text-lg" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <button type="button" className={`w-full bg-gradient-to-r from-accent-teal to-accent-gold text-dark-bg py-4 px-4 rounded-2xl font-bold text-lg hover:from-accent-gold hover:to-accent-teal transition-colors shadow-xl ${styles.button}`} onClick={() => alert('Govt Login successful!')}>Sign In</button>
      </form>
      <div className="mt-8 text-center">
        <button onClick={goToSignUp} className="text-accent-gold hover:text-accent-teal font-bold text-base">Don't have an account? Sign up</button>
      </div>
    </div>
  );
}

export default GovtLogin; 