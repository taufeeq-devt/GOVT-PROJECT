import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { ChevronLeft, ChevronRight, Shield, User, Send } from 'lucide-react';
import styles from './styles.module.css';

const LandingPage = ({
  showGovtOptions,
  setShowGovtOptions,
  prevSlide,
  nextSlide,
  currentSlide,
  setCurrentSlide,
  formData,
  handleInputChange,
  handleSubmit,
  formErrors,
  goToSupplierLogin,
  goToSupplierSignUp,
  goToContractorLogin,
  goToContractorSignUp,
  goToGovtLogin,
  goToGovtSignUp
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-slate-bg to-slate-surface relative overflow-hidden font-sans">
      {/* Government Modal */}
      {showGovtOptions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => setShowGovtOptions(false)}>
          <div className="bg-[#101624]/95 backdrop-blur-2xl rounded-3xl p-10 max-w-sm w-full mx-4 shadow-2xl border-2 border-[#1de9b6]/30 relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-[#ffd580] text-2xl" onClick={() => setShowGovtOptions(false)}>
              ×
            </button>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#ffd580] mb-2">Government Official</h3>
              <p className="text-gray-400 text-sm">Select your role to continue</p>
            </div>
            <div className="space-y-3">
              <button className="w-full p-4 bg-[#101624]/80 hover:bg-[#101624] border-2 border-[#1de9b6]/20 hover:border-[#ffd580]/40 rounded-xl font-semibold text-gray-200 hover:text-[#ffd580] transition-all" onClick={() => { setShowGovtOptions(false); goToGovtLogin('supervisor'); }}>
                Supervisor
              </button>
              <button className="w-full p-4 bg-[#101624]/80 hover:bg-[#101624] border-2 border-[#1de9b6]/20 hover:border-[#ffd580]/40 rounded-xl font-semibold text-gray-200 hover:text-[#ffd580] transition-all" onClick={() => { setShowGovtOptions(false); goToGovtLogin('project-manager'); }}>
                Project Manager
              </button>
              <button className="w-full p-4 bg-[#101624]/80 hover:bg-[#101624] border-2 border-[#1de9b6]/20 hover:border-[#ffd580]/40 rounded-xl font-semibold text-gray-200 hover:text-[#ffd580] transition-all" onClick={() => { setShowGovtOptions(false); goToGovtLogin('department-admin'); }}>
                Department Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gold mb-4 tracking-tight drop-shadow-lg leading-tight">
            SecurePortal
          </h1>
          <p className="text-offwhite text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Don't reinvent the wheel with every design. Team resources are too often pulled into user-experience issues instead. Start here and get back to work faster.
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-teal mb-10 mt-8 tracking-tight drop-shadow">What we have done</h2>
        </div>

        {/* Feature Cards Section */}
        <div className="flex flex-wrap gap-10 mb-20 items-stretch justify-center">
          {/* Unique angled card shapes using clip-path */}
          <div className="relative bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-14 flex flex-col items-center gap-6 min-h-56 max-w-xs shadow-2xl border-2 border-teal/30 group overflow-hidden" style={{clipPath:'polygon(0 10%, 100% 0, 100% 90%, 0 100%)'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd580]/10 to-[#1de9b6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-20 h-20 bg-gradient-to-br from-[#ffd580] to-[#1de9b6] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
              🚀
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-xl font-bold text-[#ffd580] mb-2">Innovation</h3>
              <p className="text-base text-gray-200">Cutting-edge solutions</p>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-14 flex flex-col items-center gap-6 min-h-56 max-w-xs shadow-2xl border-2 border-teal/30 group overflow-hidden" style={{clipPath:'polygon(0 0, 100% 10%, 100% 100%, 0 90%)'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1de9b6]/10 to-[#ffd580]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-20 h-20 bg-gradient-to-br from-[#1de9b6] to-[#ffd580] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:rotate-12 transition-transform duration-500">
              🔒
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-xl font-bold text-[#1de9b6] mb-2">Security</h3>
              <p className="text-base text-gray-200">Bank-level protection</p>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-14 flex flex-col items-center gap-6 min-h-56 max-w-xs shadow-2xl border-2 border-teal/30 group overflow-hidden" style={{clipPath:'polygon(10% 0, 100% 0, 90% 100%, 0 90%)'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd580]/10 to-[#1de9b6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-20 h-20 bg-gradient-to-br from-[#ffd580] to-[#1de9b6] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
              ⚡
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-xl font-bold text-[#ffd580] mb-2">Speed</h3>
              <p className="text-base text-gray-200">Lightning fast processing</p>
            </div>
          </div>
        </div>

        {/* Join Section */}
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-gold mb-8 tracking-tight drop-shadow">Join SecurePortal</h2>
          <div className="flex flex-wrap gap-10 justify-center">
            <button className="bg-gradient-to-br from-gold/80 to-teal/80 px-16 py-7 rounded-3xl font-bold text-navy text-2xl shadow-2xl border-2 border-gold/40 hover:scale-105 hover:shadow-3xl transition-all" onClick={goToSupplierLogin}>
              Supplier
            </button>
            <button className="bg-gradient-to-br from-gold/80 to-teal/80 px-16 py-7 rounded-3xl font-bold text-navy text-2xl shadow-2xl border-2 border-gold/40 hover:scale-105 hover:shadow-3xl transition-all" onClick={() => setShowGovtOptions(true)}>
              Government Official
            </button>
            <button className="bg-gradient-to-br from-gold/80 to-teal/80 px-16 py-7 rounded-3xl font-bold text-navy text-2xl shadow-2xl border-2 border-gold/40 hover:scale-105 hover:shadow-3xl transition-all" onClick={goToContractorLogin}>
              Contractor
            </button>
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal mb-8 tracking-tight drop-shadow">Our Vision</h2>
          <div className="bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-16 max-w-3xl mx-auto shadow-2xl border-2 border-teal/30 hover:scale-[1.02] transition-transform">
            <p className="text-offwhite text-2xl leading-relaxed">
              We envision a digital government platform that seamlessly connects suppliers, officials, and contractors in a secure, transparent, and efficient ecosystem. Our mission is to modernize public service delivery through innovative technology solutions.
            </p>
          </div>
        </div>

        {/* Stats Section with Slider */}
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-gold mb-8 tracking-tight drop-shadow">Our Impact</h2>
          {/* Truly full-width sliding banner */}
          <div className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen bg-gradient-to-r from-[#101624]/80 via-[#162032]/80 to-[#101624]/80 text-[#ffd580] py-8 mb-14 overflow-hidden border-t-2 border-b-2 border-[#1de9b6]/20 shadow-xl">
            <div className={`whitespace-nowrap text-5xl font-extrabold tracking-tight px-12 ${styles.marquee}`}>
              {Array(20).fill('Secure Portal ★').join('\u00A0')}
            </div>
          </div>
          <div className="flex items-center justify-center gap-8">
            <button 
              className="bg-gradient-to-br from-[#101624]/80 to-[#162032]/80 border-2 border-[#1de9b6]/30 rounded-full w-20 h-20 flex items-center justify-center text-[#ffd580] text-3xl hover:bg-[#101624]/90 hover:scale-110 transition-all shadow-xl"
              onClick={prevSlide}
            >
              <ChevronLeft size={40} />
            </button>
            <div className="w-[480px] overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="relative bg-gradient-to-br from-[#101624]/90 to-[#162032]/90 rounded-3xl p-20 min-w-full text-center shadow-2xl border-4 border-[#1de9b6]/30 group overflow-hidden" style={{clipPath:'polygon(0 10%, 100% 0, 100% 90%, 0 100%)'}}>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ffd580]/10 to-[#1de9b6]/10 pointer-events-none group-hover:opacity-80 transition-opacity duration-300"></div>
                  <h3 className="relative z-10 text-6xl font-extrabold text-[#ffd580] mb-6 drop-shadow-lg">10K+</h3>
                  <p className="relative z-10 text-2xl text-gray-200 font-semibold">Active Users</p>
                </div>
                <div className="relative bg-gradient-to-br from-[#101624]/90 to-[#162032]/90 rounded-3xl p-20 min-w-full text-center shadow-2xl border-4 border-[#1de9b6]/30 group overflow-hidden" style={{clipPath:'polygon(0 0, 100% 10%, 100% 100%, 0 90%)'}}>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1de9b6]/10 to-[#ffd580]/10 pointer-events-none group-hover:opacity-80 transition-opacity duration-300"></div>
                  <h3 className="relative z-10 text-6xl font-extrabold text-[#1de9b6] mb-6 drop-shadow-lg">500+</h3>
                  <p className="relative z-10 text-2xl text-gray-200 font-semibold">Projects Completed</p>
                </div>
                <div className="relative bg-gradient-to-br from-[#101624]/90 to-[#162032]/90 rounded-3xl p-20 min-w-full text-center shadow-2xl border-4 border-[#1de9b6]/30 group overflow-hidden" style={{clipPath:'polygon(10% 0, 100% 0, 90% 100%, 0 90%)'}}>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ffd580]/10 to-[#1de9b6]/10 pointer-events-none group-hover:opacity-80 transition-opacity duration-300"></div>
                  <h3 className="relative z-10 text-6xl font-extrabold text-[#ffd580] mb-6 drop-shadow-lg">99.9%</h3>
                  <p className="relative z-10 text-2xl text-gray-200 font-semibold">Uptime</p>
                </div>
              </div>
            </div>
            <button 
              className="bg-gradient-to-br from-[#101624]/80 to-[#162032]/80 border-2 border-[#1de9b6]/30 rounded-full w-20 h-20 flex items-center justify-center text-[#ffd580] text-3xl hover:bg-[#101624]/90 hover:scale-110 transition-all shadow-xl"
              onClick={nextSlide}
            >
              <ChevronRight size={40} />
            </button>
          </div>
          {/* Slide indicators */}
          <div className="flex justify-center gap-6 mt-10">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 border-[#1de9b6]/30 transition-all ${currentSlide === index ? 'bg-[#ffd580]' : 'bg-[#101624]'}`}
                onClick={() => {
                  setCurrentSlide(index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-teal mb-6 tracking-tight drop-shadow">Get in Touch</h2>
          <div className="bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-16 max-w-2xl mx-auto shadow-2xl border-2 border-teal/30 hover:scale-[1.02] transition-transform">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="text-left">
                <label className="block mb-2 font-semibold text-gold text-lg">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-5 border-2 rounded-2xl text-lg transition-all focus:outline-none focus:border-gold focus:shadow-lg bg-navy/80 text-offwhite ${formErrors.email ? 'border-red-400' : 'border-teal/30'}`}
                  placeholder="your.email@example.com"
                  required
                />
                {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div className="text-left">
                <label className="block mb-2 font-semibold text-gold text-lg">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-5 border-2 rounded-2xl text-lg transition-all focus:outline-none focus:border-gold focus:shadow-lg bg-navy/80 text-offwhite ${formErrors.phone ? 'border-red-400' : 'border-teal/30'}`}
                  placeholder="+91 98765 43210"
                />
                {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
              </div>
              <div className="text-left">
                <label className="block mb-2 font-semibold text-gold text-lg">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-6 py-5 border-2 rounded-2xl text-lg transition-all focus:outline-none focus:border-gold focus:shadow-lg bg-navy/80 text-offwhite resize-y ${formErrors.message ? 'border-red-400' : 'border-teal/30'}`}
                  placeholder="Tell us how we can help you..."
                  required
                />
                {formErrors.message && <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-gold to-teal text-navy px-14 py-5 rounded-2xl text-lg font-bold hover:-translate-y-1 hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
              >
                <Send size={22} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Animations are now in LandingPage.module.css */}
    </div>
  );
};

export default LandingPage; 