import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeViewDetails, showBiddingForm } from './dashboardSlice';
import { 
  X, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText, 
  Users, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Building,
  Briefcase,
  Settings,
  Upload
} from 'lucide-react';


const ProjectDetailsPopup = ({ isOpen, onClose, project,onInterested }) => {
  const dispatch = useDispatch();
  const [activeDocumentTab, setActiveDocumentTab] = useState('legal');
    
  if (!isOpen) return null;

  
  const projectData = project
  console.log(projectData);
  

  const documentTabs = [
    { id: 'legal', label: 'Legal Papers', icon: Shield, color: 'text-emerald-400' },
    { id: 'blueprints', label: 'Blueprints', icon: FileText, color: 'text-cyan-400' },
    { id: 'boq', label: 'BOQ', icon: DollarSign, color: 'text-yellow-400' },
    { id: 'safety', label: 'Safety & Compliance', icon: AlertCircle, color: 'text-red-400' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="flex flex-col bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{projectData.name}</h2>
              <p className="text-slate-400">Project ID: #{projectData.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="bg-slate-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Department</p>
                    <p className="text-sm font-medium text-white">{projectData.department}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Zone / Region</p>
                    <p className="text-sm font-medium text-white">{projectData.zone}</p>
                    <p className="text-xs text-slate-400">{projectData.region}</p>
                  </div>
                </div>
                
                <div className="bg-slate-600/30 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2">Project Description</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{projectData.description}</p>
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="bg-slate-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Timeline & Budget</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Project Deadline</p>
                    <p className="text-sm font-medium text-white">{projectData.deadline}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Expected Start Date</p>
                    <p className="text-sm font-medium text-white">{projectData.expectedStartDate}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Bid Submission Deadline</p>
                    <p className="text-sm font-medium text-red-400">{projectData.bidSubmissionDeadline}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Total Budget</p>
                    <p className="text-sm font-medium text-emerald-400">{projectData.budget}</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-slate-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Requirements</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Contractor Requirements</h4>
                    <div className="space-y-2">
                      {projectData.contractorRequirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Required Materials</h4>
                    <div className="space-y-2">
                      {projectData.requiredMaterials.map((material, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Settings className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Estimated Quantities</h4>
                    <div className="space-y-2">
                      {projectData.estimatedQuantities.map((quantity, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <DollarSign className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Sidebar */}
          <div className="w-80 bg-slate-700/30 border-l border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-lg flex items-center justify-center">
                <Upload className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Document Uploads</h3>
            </div>

            {/* Document Tabs */}
            <div className="space-y-1 mb-6">
              {documentTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDocumentTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      activeDocumentTab === tab.id
                        ? 'bg-slate-600/50 text-white'
                        : 'text-slate-400 hover:bg-slate-600/30 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Document List */}
            <div className="space-y-2">
              {projectData.documents[activeDocumentTab]?.map((doc, index) => (
                <div key={index} className="bg-slate-600/30 rounded-lg p-3 hover:bg-slate-600/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white truncate">{doc.name}</span>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-500/30 rounded">
                        <Eye className="w-3 h-3 text-slate-400" />
                      </button>
                      <button className="p-1 hover:bg-slate-500/30 rounded">
                        <Download className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{doc.type}</span>
                    <span className="text-xs text-slate-400">{doc.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">{projectData.bidsCount} bids submitted</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">{projectData.timeLeft} remaining</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-slate-900 font-medium rounded-lg transition-all"
              onClick={onInterested}
              >
                Interested To  Bid
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};



export default ProjectDetailsPopup;