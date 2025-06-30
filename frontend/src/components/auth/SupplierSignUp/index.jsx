import React from 'react';
import styles from './styles.module.css';

function SupplierSignUp({ goBack, goToLogin }) {
  const [form, setForm] = React.useState({ email: '', password: '', company: '', supplierId: '' });
  return (
    <div className="text-main">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 text-4xl">🚚</div>
        <h2 className="text-2xl font-bold text-accent-gold mb-2 drop-shadow">Supplier Registration</h2>
        <p className="text-base text-accent-teal mb-2">Become a SecurePortal supplier</p>
      </div>
      <form className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-base font-semibold text-accent-gold mb-1">Company Name</label>
            <input type="text" className="w-full px-5 py-4 border border-accent-gold/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-gold focus:border-accent-gold text-lg" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Your Company" />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold text-accent-gold mb-1">Supplier ID</label>
            <input type="text" className="w-full px-5 py-4 border border-accent-gold/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-gold focus:border-accent-gold text-lg" value={form.supplierId} onChange={e => setForm(f => ({ ...f, supplierId: e.target.value }))} placeholder="Supplier ID" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-base font-semibold text-accent-gold mb-1">Email</label>
            <input type="email" className="w-full px-5 py-4 border border-accent-gold/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-gold focus:border-accent-gold text-lg" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold text-accent-gold mb-1">Password</label>
            <input type="password" className="w-full px-5 py-4 border border-accent-gold/30 rounded-xl bg-dark-surface/80 text-main focus:ring-2 focus:ring-accent-gold focus:border-accent-gold text-lg" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" />
          </div>
        </div>
        <button type="button" className="w-full bg-gradient-to-r from-accent-gold to-accent-teal text-dark-bg py-4 px-4 rounded-2xl font-bold text-lg hover:from-accent-teal hover:to-accent-gold transition-colors shadow-xl" onClick={() => alert('Supplier Sign Up successful!')}>Sign Up</button>
      </form>
      <div className="mt-8 text-center">
        <button onClick={goToLogin} className="text-accent-teal hover:text-accent-gold font-bold text-base">Already have an account? Sign in</button>
      </div>
    </div>
  );
}

export default SupplierSignUp; 