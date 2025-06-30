import React from 'react';
import styles from './styles.module.css';

function GovtSignUp({ goBack, goToLogin, govtRole }) {
  const [form, setForm] = React.useState({ email: '', password: '', department: '', officialId: '' });
  return (
    <div className="text-main">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 text-4xl">🏛️</div>
        <h2 className="text-2xl font-bold text-accent-teal mb-2 drop-shadow">{(govtRole ? govtRole.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' ' : '') + 'Official Registration'}</h2>
        <p className="text-base text-accent-gold mb-2">Register as a new government official</p>
      </div>
      <form className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-base font-semibold text-accent-teal mb-1">Department</label>
            <input type="text" className="w-full px-5 py-4 border border-accent-teal/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-teal focus:border-accent-teal text-lg" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} placeholder="Department" />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold text-accent-teal mb-1">Official ID</label>
            <input type="text" className="w-full px-5 py-4 border border-accent-teal/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-teal focus:border-accent-teal text-lg" value={form.officialId} onChange={e => setForm(f => ({ ...f, officialId: e.target.value }))} placeholder="Official ID" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-base font-semibold text-accent-teal mb-1">Email</label>
            <input type="email" className="w-full px-5 py-4 border border-accent-teal/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-teal focus:border-accent-teal text-lg" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold text-accent-teal mb-1">Password</label>
            <input type="password" className="w-full px-5 py-4 border border-accent-teal/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-teal focus:border-accent-teal text-lg" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" />
          </div>
        </div>
        <button type="button" className="w-full bg-gradient-to-r from-accent-teal to-accent-gold text-dark-bg py-4 px-4 rounded-2xl font-bold text-lg hover:from-accent-gold hover:to-accent-teal transition-colors shadow-xl" onClick={() => alert('Govt Sign Up successful!')}>Sign Up</button>
      </form>
      <div className="mt-8 text-center">
        <button onClick={goToLogin} className="text-accent-gold hover:text-accent-teal font-bold text-base">Already have an account? Sign in</button>
      </div>
    </div>
  );
}

export default GovtSignUp; 