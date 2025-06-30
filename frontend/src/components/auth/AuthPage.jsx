import React from 'react';
import SupplierLogin from './SupplierLogin';
import SupplierSignUp from './SupplierSignUp';
import GovtLogin from './GovtLogin';
import GovtSignUp from './GovtSignUp';
import ContractorLogin from './ContractorLogin';
import ContractorSignUp from './ContractorSignUp';
import { ArrowLeft } from 'lucide-react';
import styles from './AuthPage.module.css';

function AuthPage({ authMode, setAuthMode, setCurrentPage, authUserType, govtRole }) {
  const [supplierData, setSupplierData] = React.useState({ email: '', password: '', company: '', supplierId: '' });
  const [govtData, setGovtData] = React.useState({ email: '', password: '', department: '', officialId: '', role: govtRole || '' });
  const [contractorData, setContractorData] = React.useState({ email: '', password: '', company: '', license: '' });

  // Navigation handlers
  const goToSupplierLogin = () => setCurrentPage('supplier-login');
  const goToSupplierSignUp = () => setCurrentPage('supplier-signup');
  const goToGovtLogin = () => setCurrentPage('govt-login');
  const goToGovtSignUp = () => setCurrentPage('govt-signup');
  const goToContractorLogin = () => setCurrentPage('contractor-login');
  const goToContractorSignUp = () => setCurrentPage('contractor-signup');

  let formComponent;
  if (authUserType === 'supplier') {
    if (authMode === 'signup') {
      formComponent = <SupplierSignUp goBack={() => setCurrentPage('landing')} goToLogin={goToSupplierLogin} />;
    } else {
      formComponent = <SupplierLogin goBack={() => setCurrentPage('landing')} goToSignUp={goToSupplierSignUp} />;
    }
  } else if (authUserType === 'govt') {
    if (authMode === 'signup') {
      formComponent = <GovtSignUp goBack={() => setCurrentPage('landing')} goToLogin={goToGovtLogin} govtRole={govtRole} />;
    } else {
      formComponent = <GovtLogin goBack={() => setCurrentPage('landing')} goToSignUp={goToGovtSignUp} govtRole={govtRole} />;
    }
  } else if (authUserType === 'contractor') {
    if (authMode === 'signup') {
      formComponent = <ContractorSignUp goBack={() => setCurrentPage('landing')} goToLogin={goToContractorLogin} />;
    } else {
      formComponent = <ContractorLogin goBack={() => setCurrentPage('landing')} goToSignUp={goToContractorSignUp} />;
    }
  } else {
    formComponent = <div className="text-center text-[#ffd580]">Please select a user type.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center p-4">
      <div className={`bg-gradient-to-br from-dark-card/90 to-dark-surface/90 rounded-3xl p-10 w-full max-w-lg shadow-2xl border border-slate-700 backdrop-blur-2xl ${styles.authCard}`}>
        <button 
          onClick={() => setCurrentPage('landing')}
          className="mb-8 flex items-center gap-2 text-accent-gold hover:text-accent-teal transition-colors font-semibold"
        >
          <ArrowLeft size={22} />
          Back to Home
        </button>
        {formComponent}
      </div>
    </div>
  );
}

export default AuthPage; 