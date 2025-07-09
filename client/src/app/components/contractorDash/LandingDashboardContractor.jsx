import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectDetailsPopup from './BiddingDetailsCard';
import {
  Shield,
  Home,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  DollarSign,
  User,
  Upload,
  Lock,
  Eye,
  X,
  UserCircle,
  LogOut,
} from 'lucide-react';
import BiddingFormCard from './BiddingForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setActiveTab,
  openViewDetails,
  closeViewDetails,
  showBiddingForm,
  hideBiddingForm,
  recalculateDashMode,
} from './dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const activeTab = useSelector(state => state.projectsDashboard.activeTab);
  const [showMaterials, setShowMaterials] = useState(false);
  const showViewDetails = useSelector(state => state.projectsDashboard.showViewDetails);
  const isBiddingFormVisible = useSelector(state => state.projectsDashboard.showBiddingForm);
  const viewProject = useSelector(state => state.projectsDashboard.viewProject);
  const myBids = useSelector(state => state.projectsDashboard.myBids);

  const hasAcceptedBid = myBids.some(bid => bid.status === 'accepted');
  const dashboardMode = useSelector(state => state.projectsDashboard.dashMode)
  useEffect(() => {
    if (dashboardMode === 'execution') {
      navigate('/'); 
    }
  }, [dashboardMode, navigate]);
  

  useEffect(() => {
    dispatch(recalculateDashMode())
    if (dashboardMode === 'bidding' && activeTab !== 'overview' && activeTab !== 'projects' && activeTab !== 'bids' && activeTab !== 'communication' && activeTab !== 'settings') {
      dispatch(setActiveTab('overview'));
    } else if (dashboardMode === 'execution' && activeTab !== 'overview' && activeTab !== 'projects' && activeTab !== 'updates'&& activeTab !== 'fund' && activeTab !== 'expenses' && activeTab !== 'communication' && activeTab !== 'settings') {
      dispatch(setActiveTab('overview'));
    }
  }, [dashboardMode, activeTab, dispatch]);

  const biddingStats = [
    { title: 'Active Bids', value: '3', icon: FileText, color: 'from-emerald-400 to-cyan-400' },
    { title: 'Projects Available', value: '12', icon: Eye, color: 'from-yellow-400 to-orange-400' },
    { title: 'Bid Success Rate', value: '75%', icon: TrendingUp, color: 'from-green-400 to-emerald-400' },
  ];

  const availableProjects = useSelector(state => state.projectsDashboard.availableProjects)
const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, link: "/" },
    { id: 'projects', label: 'Available Projects', hidden: dashboardMode === 'execution', icon: FileText, link: "/availableprojects" },
    { id: 'updates', label: 'Updates', icon: Activity, hidden: dashboardMode === 'bidding', link: "/updates" },
    { id: 'expenses', label: 'Expenses', icon: BarChart3, hidden: dashboardMode === 'bidding', link: "/expenses" },
    { id: 'bids', label: 'My Bids', icon: DollarSign, hidden: dashboardMode === 'execution', link: "/bids" },
    { id: 'communication', label: 'Communication', hidden: dashboardMode === 'bidding', icon: Users, link: "/communication" },
    { id: 'fund', label: 'Request Fund', hidden: dashboardMode === 'bidding', icon: DollarSign, link: "/requestFund" },
    { id: 'settings', label: 'Settings', icon: Settings, link: "/settings" },
  ];

  const currentProject = useSelector(state => state.projectsDashboard.allotedProject)
  const parseDate = (str) => {
  const [day, month, year] = str.split('/');
  return new Date(`${year}-${month}-${day}`);
};
 function useParsedStartDate(date) {
  

  if (!date) return null;

  try {
    const [day, month, year] = date.split('/');
    const newDate = new Date(`${year}-${month}-${day}`);
    const formattedDate = newDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return String(formattedDate);
  } catch (e) {
    console.error("Invalid startDate format:", date);
    return null;
  }
}

  const executionStats = [
    { title: 'Allocated Project', value: '1', icon: CheckCircle, color: 'from-emerald-400 to-cyan-400' },
    { title: 'Project Progress', value: currentProject.progress+"%", icon: TrendingUp, color: 'from-yellow-400 to-orange-400' },
    { title: 'Updates Submitted', value: useSelector(state => state.projectsDashboard.submittedUpdates).length, icon: FileText, color: 'from-green-400 to-emerald-400' },
    { title: 'Days Remaining', value: (Math.ceil(parseDate(currentProject.endDate)-parseDate(currentProject.startDate))/ (1000 * 60 * 60 * 24)), icon: Clock, color: 'from-purple-400 to-pink-400' },
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'under_review': return 'text-orange-400';
      case 'rejected': return 'text-red-400';
      case 'accepted': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getBidStatusBg = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-400/20';
      case 'under_review': return 'bg-orange-400/20';
      case 'rejected': return 'bg-red-400/20';
      case 'accepted': return 'bg-green-400/20';
      default: return 'bg-gray-400/20';
    }
  };

  const currentStats = hasAcceptedBid === false ? biddingStats : executionStats;

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const ViewMaterialsPopup = ({ isOpen, onClose }) => {
  const project = useSelector(state => state.projectsDashboard.allotedProject);

  if (!isOpen || !project) return null;

  const renderDocs = (label, docs) => (
    <div className="mb-4">
      <h4 className="text-white font-semibold mb-2">{label}</h4>
      <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
        {docs.map((doc, index) => (
          <li key={index}>
            {doc.name} <span className="text-slate-400">({doc.type}, {doc.size})</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-3xl overflow-y-auto max-h-[90vh] border border-slate-600 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Project Materials</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-white font-semibold mb-2">Required Materials</h4>
          <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
            {project.requiredMaterials.map((mat, i) => (
              <li key={i}>{mat}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-white font-semibold mb-2">Estimated Quantities</h4>
          <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
            {project.estimatedQuantities.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          {Object.entries(project.documents).map(([section, docs]) =>
            renderDocs(section.charAt(0).toUpperCase() + section.slice(1), docs)
          )}
        </div>
      </div>
    </div>
  );
};


  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <div className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-yellow-500/5"></div>

        {/* Logo */}
        <div className="flex items-center gap-3 p-6 relative z-10">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-300 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-slate-900" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
            SecurePortal
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4 relative z-10">
          {sidebarItems.filter(item => !item.hidden).map((item) => {
            const Icon = item.icon;
            return (
              <Link to={item.link} key={item.id}>
                <button
                  onClick={() => dispatch(setActiveTab(item.id))}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:brightness-110 transition-all shadow-lg shadow-em pilota-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-slate-900" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Contractor</p>
              <p className="text-xs text-slate-400">contractor@secureportal.com</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>
          {isProfileOpen && (
            <div className="mt-3 bg-slate-600/50 rounded-lg p-2 flex flex-col gap-3">
              <Link to="/profile">
                <button 
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors"
                  onClick={() => dispatch(setActiveTab(""))}
                >
                  <UserCircle className="w-4 h-4" />
                  Profile
                </button>
              </Link>
              <Link to="/logout">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-400/40 text-red-400/90 hover:bg-slate-500/50 rounded-md transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Overview</h2>
              <p className="text-slate-400 mt-1">
                {dashboardMode === 'bidding'
                  ? 'Find and bid on available projects'
                  : 'Track progress and manage your allocated project'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={dashboardMode === 'bidding' ? 'Search projects...' : 'Search materials, updates...'}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                />
              </div>
              <button className="relative p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Content based on mode */}
          {dashboardMode === 'bidding' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Available Projects */}
              <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Available Projects</h3>
                  <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm rounded-full">
                    Bidding Mode
                  </span>
                </div>

                <div className="space-y-4">
                  {availableProjects.map((project) => (
                    <div key={project.id} className="bg-slate-700/30 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 border border-slate-600/30">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent text-lg mb-2">{project.name}</h4>
                          <p className="text-sm text-slate-400 mb-3">{project.description}</p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-slate-600/30 rounded-lg p-3">
                              <p className="text-xs text-slate-400">Budget</p>
                              <p className="text-sm font-medium text-emerald-400">{project.budget}</p>
                            </div>
                            <div className="bg-slate-600/30 rounded-lg p-3">
                              <p className="text-xs text-slate-400">Deadline</p>
                              <p className="text-sm font-medium text-white">{project.deadline}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm text-slate-300">{project.bidsCount} bids</span>
                            <span className="text-sm text-yellow-400">⏱️ {project.timeLeft}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          className="bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 px-4 py-2 rounded-lg transition-colors"
                          onClick={() => {
                            dispatch(openViewDetails(project));
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Bids */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-6">My Bids</h3>

                <div className="space-y-4">
                  {myBids.map((bid) => (
                    <div key={bid.id} className="bg-slate-700/30 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm mb-1">{bid.projectName}</h4>
                          <p className="text-xs text-slate-400">Bid: {bid.bidAmount}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getBidStatusBg(bid.status)} ${getStatusColor(bid.status)}`}>
                          {bid.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Submitted: {bid.submittedDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Project */}
              <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Current Project</h3>
                  <span className="px-3 py-1 bg-emerald-400/20 text-emerald-400 text-sm rounded-full">
                    Execution Mode
                  </span>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-lg">{currentProject.name}</h4>
                        <p className="text-sm text-slate-400">Supervisor: {currentProject.supervisor}</p>
                        <span className="text-sm text-emerald-400">Current Phase: {currentProject.currentPhase}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-600/30 rounded-lg p-3">
                      <p className="text-xs text-slate-400">Start Date</p>
                      <p className="text-sm font-medium text-white">{(useParsedStartDate(currentProject.startDate))}</p>
                    </div>
                    <div className="bg-slate-600/30 rounded-lg p-3">
                      <p className="text-xs text-slate-400">End Date</p>
                      <p className="text-sm font-medium text-white">{(useParsedStartDate(currentProject.endDate))}</p>
                    </div>
                  </div>

                  {currentProject.issues && currentProject.issues.trim() !== "" && (
                    <div className="mb-4">
                      <span className="text-lg text-red-400">Issues: {currentProject.issues}</span>
                    </div>
                  )}

                  <div className="w-full bg-slate-600 rounded-full h-3 mb-3">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${currentProject.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-300">{currentProject.progress}% Complete</span>
                    <span className="text-sm text-emerald-400">Next: {currentProject.nextPhase}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium rounded-lg  transition-all shadow-lg shadow-em pilota-emerald-500/20"
                    onClick={()=>(navigate("/updates"))}>
                      Upload Update
                    </button>
                    <button className="bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 px-4 py-2 rounded-lg transition-colors"
                    onClick={() => setShowMaterials(true)}>
                      View Materials
                    </button>
                  </div>
                </div>
              </div>

              {/* Responsibilities & Tools */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-6">Responsibilities</h3>

                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Required Updates</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-slate-300">Weekly progress report</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-slate-300">Visual documentation</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Materials</h4>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-slate-300">Supplier materials approved</span>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Quick Actions</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <button className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 py-2 rounded-lg text-sm transition-colors"
                      onClick={()=>(navigate("/updates"))}>
                        Upload Proof of Work
                      </button>
                      <button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-2 rounded-lg text-sm transition-colors"
                       onClick={()=>(navigate("/expenses"))}>
                        Track Expenses
                      </button>
                      <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-3 py-2 rounded-lg text-sm transition-colors">
                        Message Supervisor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Details Popup */}
      {showViewDetails && (
        <ProjectDetailsPopup  
          isOpen={showViewDetails} 
          onClose={() => dispatch(closeViewDetails())}
          project={viewProject}
          onInterested={() => {
            dispatch(showBiddingForm());
            setTimeout(() => dispatch(closeViewDetails()), 10);
          }}
        />
      )}

      {/* Bidding Form */}
      {isBiddingFormVisible && (
        <BiddingFormCard
          project={viewProject}
          show={true}
          onClose={() => dispatch(hideBiddingForm())}
        />
      )}

      {showMaterials && <ViewMaterialsPopup isOpen={true} onClose={() => setShowMaterials(false)} />}
    </div>
  );
};

export default Dashboard;