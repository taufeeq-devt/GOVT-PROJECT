import React, { useState, useEffect } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import LoadingScreen from './common/LoadingScreen';
import LandingPage from './landing/LandingPage';
import AuthWrapper from './auth/AuthWrapper';
import SupplierLogin from './auth/SupplierLogin';
import SupplierSignUp from './auth/SupplierSignUp';
import GovtLogin from './auth/GovtLogin';
import GovtSignUp from './auth/GovtSignUp';
import ContractorLogin from './auth/ContractorLogin';
import ContractorSignUp from './auth/ContractorSignUp';

const MainApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState('landing');
  const [showGovtOptions, setShowGovtOptions] = useState(false);
  const [formData, setFormData] = useState({ email: '', phone: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [govtRole, setGovtRole] = useState(null);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => { setCurrentSlide((prev) => (prev + 1) % 3); };
  const prevSlide = () => { setCurrentSlide((prev) => (prev - 1 + 3) % 3); };
  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Enter a valid email address.';
    if (formData.phone && !/^\+?[0-9\s\-()]{7,}$/.test(formData.phone)) errors.phone = 'Enter a valid phone number.';
    if (!formData.message) errors.message = 'Message is required.';
    else if (formData.message.length < 10) errors.message = 'Message must be at least 10 characters.';
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    alert('Message sent successfully!');
    setFormData({ email: '', phone: '', message: '' });
    setFormErrors({});
  };

  // Navigation handlers
  const goToSupplierLogin = () => { setCurrentPage('supplier-login'); };
  const goToSupplierSignUp = () => { setCurrentPage('supplier-signup'); };
  const goToGovtLogin = (role) => { setCurrentPage('govt-login'); setGovtRole(role); };
  const goToGovtSignUp = (role) => { setCurrentPage('govt-signup'); setGovtRole(role); };
  const goToContractorLogin = () => { setCurrentPage('contractor-login'); };
  const goToContractorSignUp = () => { setCurrentPage('contractor-signup'); };
  const goToLanding = () => {
    setCurrentPage('landing');
    setGovtRole(null);
  };

  // Government-specific navigation handlers that preserve the role
  const goToGovtLoginFromSignup = () => { setCurrentPage('govt-login'); };
  const goToGovtSignUpFromLogin = () => { setCurrentPage('govt-signup'); };

  if (loading) return <LoadingScreen />;

  if (currentPage === 'landing') {
    return (
      <LandingPage
        showGovtOptions={showGovtOptions}
        setShowGovtOptions={setShowGovtOptions}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        goToSupplierLogin={goToSupplierLogin}
        goToSupplierSignUp={goToSupplierSignUp}
        goToContractorLogin={goToContractorLogin}
        goToContractorSignUp={goToContractorSignUp}
        goToGovtLogin={goToGovtLogin}
        goToGovtSignUp={goToGovtSignUp}
      />
    );
  }

  // Render individual auth pages
  if (currentPage === 'supplier-login') {
    return (
      <AuthWrapper goBack={goToLanding}>
        <SupplierLogin goBack={goToLanding} goToSignUp={goToSupplierSignUp} />
      </AuthWrapper>
    );
  }
  
  if (currentPage === 'supplier-signup') {
    return (
      <AuthWrapper goBack={goToLanding}>
        <SupplierSignUp goBack={goToLanding} goToLogin={goToSupplierLogin} />
      </AuthWrapper>
    );
  }
  
  if (currentPage === 'govt-login') {
    return (
      <AuthWrapper goBack={goToLanding}>
        <GovtLogin goBack={goToLanding} goToSignUp={goToGovtSignUpFromLogin} govtRole={govtRole} />
      </AuthWrapper>
    );
  }
  
  if (currentPage === 'govt-signup') {
    return (
      <AuthWrapper goBack={goToLanding}>
        <GovtSignUp goBack={goToLanding} goToLogin={goToGovtLoginFromSignup} govtRole={govtRole} />
      </AuthWrapper>
    );
  }
  
  if (currentPage === 'contractor-login') {
    return (
      <AuthWrapper goBack={goToLanding}>
        <ContractorLogin goBack={goToLanding} goToSignUp={goToContractorSignUp} />
      </AuthWrapper>
    );
  }
  
  if (currentPage === 'contractor-signup') {
    return (
      <AuthWrapper goBack={goToLanding}>
        <ContractorSignUp goBack={goToLanding} goToLogin={goToContractorLogin} />
      </AuthWrapper>
    );
  }
};

export default MainApp; 