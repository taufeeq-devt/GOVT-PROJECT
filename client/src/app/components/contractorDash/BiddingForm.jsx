import React, { useState } from 'react';
import {
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Upload,
  CheckCircle,
  AlertTriangle,
  Building,
  User,
  PenTool,
  Paperclip,
  Send,
  X
} from 'lucide-react';

const BiddingFormCard = ({ project, show, onClose }) => {
  const [formData, setFormData] = useState({
    projectTime: '',
    budget: '',
    workers: '',
    workPlan: null,
    experience: '',
    supportingDocs: null
  });

  if (!show) return null;

  const projectData = project;
  console.log(projectData);
  

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded hover:bg-slate-700/50"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
            Bidding Form
          </h1>
          <p className="text-slate-400">Submit your bid for this project</p>
        </div>

        {/* Project Info Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Project Information</h3>
              <p className="text-sm text-slate-400">Auto-filled from selected project</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Title</span>
              </div>
              <p className="text-sm font-medium text-white">{projectData.name}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Region</span>
              </div>
              <p className="text-sm font-medium text-white">{projectData.region}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Department</span>
              </div>
              <p className="text-sm font-medium text-white">{projectData.department}</p>
            </div>
          </div>
        </div>

        {/* Bidding Form */}
        <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 space-y-6">
          {/* Project Time */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Estimated Project Time <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
              placeholder="e.g., 3 months or 45 days"
              value={formData.projectTime}
              onChange={(e) => handleInputChange('projectTime', e.target.value)}
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Estimated Budget <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
              placeholder="Enter your bid amount"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
            />
          </div>

          {/* Workers */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Number of Workers <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
              placeholder="e.g., 15"
              value={formData.workers}
              onChange={(e) => handleInputChange('workers', e.target.value)}
            />
          </div>

          {/* Work Plan */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Work Plan Description <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
              placeholder="Describe your work plan..."
              onChange={(e) => handleInputChange('workPlan', e.target.value)}
            />
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Experience Justification <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
              placeholder="Briefly describe similar work done"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:from-emerald-500 hover:to-cyan-500 transition"
            >
              <Send className="inline-block mr-2 w-5 h-5" />
              Submit Bid
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingFormCard;
