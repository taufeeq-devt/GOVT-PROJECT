import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronRight, Plus, UploadCloud } from 'lucide-react';

const DEPARTMENTS = ['Public Works', 'Education', 'Health', 'Transport'];
const ZONES = ['North', 'South', 'East', 'West', 'Central'];
const SKILLS = ['Civil Engineering', 'Electrical', 'Plumbing', 'Masonry', 'Surveying'];
const LICENSES = ['Class A', 'Class B', 'Class C', 'ISO 9001', 'Safety'];

const STEP_COLORS = [
  'border-success', // Step 1
  'border-warning', // Step 2
  'border-accent',  // Step 3
  'border-primary', // Step 4
  'border-accent',  // Step 5
];

function StepIndicator({ step, setStep }) {
  const steps = [
    { label: 'Basic Info' },
    { label: 'Timeline & Budget' },
    { label: 'Contractor Requirements' },
    { label: 'Document Uploads' },
    { label: 'Other Settings' },
  ];
  return (
    <div className="flex items-center justify-between mb-8 w-full">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center min-w-[90px]">
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg border-2 transition-all duration-200
                ${i === step ? 'bg-primary text-white border-primary' : 'bg-gray-200 text-primary border-gray-200'}`}
              aria-label={s.label}
            >
              {i + 1}
            </button>
            <span className={`mt-2 text-xs font-medium text-center ${i === step ? 'text-primary' : 'text-secondary'}`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight className="mx-3 text-accent/40 w-5 h-5" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Step1({ data, onChange, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block font-semibold text-primary mb-1">Project Title *</label>
        <input
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.title ? 'border-error' : ''}`}
          placeholder="Enter project title"
          value={data.title}
          onChange={e => onChange('title', e.target.value)}
          required
        />
        {errors.title && <span className="text-error text-xs">{errors.title}</span>}
      </div>
      <div className="md:col-span-2">
        <label className="block font-semibold text-primary mb-1">Project Description *</label>
        <textarea
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.description ? 'border-error' : ''}`}
          placeholder="Describe the project"
          value={data.description}
          onChange={e => onChange('description', e.target.value)}
          rows={3}
          required
        />
        {errors.description && <span className="text-error text-xs">{errors.description}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Department</label>
        <input
          className="glass w-full p-3 rounded-lg bg-gray-100 text-secondary cursor-not-allowed"
          value={DEPARTMENTS[0]}
          disabled
        />
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Zone / Region *</label>
        <select
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.zone ? 'border-error' : ''}`}
          value={data.zone}
          onChange={e => onChange('zone', e.target.value)}
          required
        >
          <option value="">Select Zone</option>
          {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
        {errors.zone && <span className="text-error text-xs">{errors.zone}</span>}
      </div>
    </div>
  );
}

function Step2({ data, onChange, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block font-semibold text-primary mb-1">Expected Start Date *</label>
        <input
          type="date"
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.startDate ? 'border-error' : ''}`}
          value={data.startDate}
          onChange={e => onChange('startDate', e.target.value)}
          required
        />
        {errors.startDate && <span className="text-error text-xs">{errors.startDate}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Project Deadline *</label>
        <input
          type="date"
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.deadline ? 'border-error' : ''}`}
          value={data.deadline}
          onChange={e => onChange('deadline', e.target.value)}
          required
        />
        {errors.deadline && <span className="text-error text-xs">{errors.deadline}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Bid Submission Deadline *</label>
        <input
          type="date"
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.bidDeadline ? 'border-error' : ''}`}
          value={data.bidDeadline}
          onChange={e => onChange('bidDeadline', e.target.value)}
          required
        />
        {errors.bidDeadline && <span className="text-error text-xs">{errors.bidDeadline}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Total Budget (₹) *</label>
        <input
          type="number"
          className={`glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30 ${errors.budget ? 'border-error' : ''}`}
          placeholder="Enter total budget"
          value={data.budget}
          onChange={e => onChange('budget', e.target.value)}
          required
        />
        {errors.budget && <span className="text-error text-xs">{errors.budget}</span>}
      </div>
    </div>
  );
}

function Step3({ data, onChange, errors }) {
  // Multi-select for skills and licenses
  const toggleMulti = (field, value) => {
    const arr = data[field] || [];
    if (arr.includes(value)) {
      onChange(field, arr.filter(v => v !== value));
    } else {
      onChange(field, [...arr, value]);
    }
  };
  // Materials table
  const addMaterial = () => onChange('materials', [...(data.materials || []), { name: '', qty: '' }]);
  const updateMaterial = (i, field, value) => {
    const arr = [...(data.materials || [])];
    arr[i][field] = value;
    onChange('materials', arr);
  };
  const removeMaterial = (i) => {
    const arr = [...(data.materials || [])];
    arr.splice(i, 1);
    onChange('materials', arr);
  };
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-semibold text-primary mb-1">Skills Required *</label>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(skill => (
            <button
              type="button"
              key={skill}
              className={`px-3 py-1 rounded-full border ${data.skills?.includes(skill) ? 'bg-accent text-white border-accent' : 'bg-border text-primary border-border'} transition`}
              onClick={() => toggleMulti('skills', skill)}
            >
              {skill}
            </button>
          ))}
        </div>
        {errors.skills && <span className="text-error text-xs">{errors.skills}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">License Types Required *</label>
        <div className="flex flex-wrap gap-2">
          {LICENSES.map(lic => (
            <button
              type="button"
              key={lic}
              className={`px-3 py-1 rounded-full border ${data.licenses?.includes(lic) ? 'bg-accent text-white border-accent' : 'bg-border text-primary border-border'} transition`}
              onClick={() => toggleMulti('licenses', lic)}
            >
              {lic}
            </button>
          ))}
        </div>
        {errors.licenses && <span className="text-error text-xs">{errors.licenses}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Materials Needed *</label>
        <div className="space-y-2">
          {(data.materials || []).map((mat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className="glass p-2 rounded-lg flex-1 focus:ring-2 focus:ring-accent/30"
                placeholder="Material Name"
                value={mat.name}
                onChange={e => updateMaterial(i, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                className="glass p-2 rounded-lg w-24 focus:ring-2 focus:ring-accent/30"
                placeholder="Qty"
                value={mat.qty}
                onChange={e => updateMaterial(i, 'qty', e.target.value)}
                required
              />
              <button type="button" onClick={() => removeMaterial(i)} className="text-error font-bold px-2">×</button>
            </div>
          ))}
          <button type="button" onClick={addMaterial} className="flex items-center gap-1 px-3 py-1 rounded bg-accent text-white hover:scale-105 transition mt-2">
            <Plus size={16} /> Add Material
          </button>
        </div>
        {errors.materials && <span className="text-error text-xs">{errors.materials}</span>}
      </div>
    </div>
  );
}

function Step4({ data, onChange, errors }) {
  // File upload handlers
  const handleFile = (field, file) => {
    onChange(field, file);
  };
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-semibold text-primary mb-1">Legal Papers (PDF) *</label>
        <label className="flex flex-col items-center px-6 py-8 glass border-2 border-dashed border-accent/30 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-card">
          <UploadCloud className="text-accent mb-2" size={28} />
          <span className="text-accent font-medium mb-2">Click or drag to upload</span>
          <input type="file" accept=".pdf" className="hidden" onChange={e => handleFile('legal', e.target.files[0])} required />
          {data.legal && <span className="text-secondary mt-2">{data.legal.name}</span>}
        </label>
        {errors.legal && <span className="text-error text-xs">{errors.legal}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Blueprints / Maps (Image or PDF) *</label>
        <label className="flex flex-col items-center px-6 py-8 glass border-2 border-dashed border-accent/30 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-card">
          <UploadCloud className="text-accent mb-2" size={28} />
          <span className="text-accent font-medium mb-2">Click or drag to upload</span>
          <input type="file" accept=".pdf,image/*" className="hidden" onChange={e => handleFile('blueprints', e.target.files[0])} required />
          {data.blueprints && <span className="text-secondary mt-2">{data.blueprints.name}</span>}
        </label>
        {errors.blueprints && <span className="text-error text-xs">{errors.blueprints}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">BOQ (PDF/Excel) *</label>
        <label className="flex flex-col items-center px-6 py-8 glass border-2 border-dashed border-accent/30 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-card">
          <UploadCloud className="text-accent mb-2" size={28} />
          <span className="text-accent font-medium mb-2">Click or drag to upload</span>
          <input type="file" accept=".pdf,.xls,.xlsx" className="hidden" onChange={e => handleFile('boq', e.target.files[0])} required />
          {data.boq && <span className="text-secondary mt-2">{data.boq.name}</span>}
        </label>
        {errors.boq && <span className="text-error text-xs">{errors.boq}</span>}
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Safety & Compliance Documents (PDF) *</label>
        <label className="flex flex-col items-center px-6 py-8 glass border-2 border-dashed border-accent/30 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-card">
          <UploadCloud className="text-accent mb-2" size={28} />
          <span className="text-accent font-medium mb-2">Click or drag to upload</span>
          <input type="file" accept=".pdf" className="hidden" onChange={e => handleFile('safety', e.target.files[0])} required />
          {data.safety && <span className="text-secondary mt-2">{data.safety.name}</span>}
        </label>
        {errors.safety && <span className="text-error text-xs">{errors.safety}</span>}
      </div>
    </div>
  );
}

function Step5({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <label className="font-semibold text-primary">AI Supplier Match</label>
        <button
          type="button"
          className={`w-12 h-7 rounded-full flex items-center transition ${data.aiMatch ? 'bg-accent' : 'bg-border'}`}
          onClick={() => onChange('aiMatch', !data.aiMatch)}
        >
          <span className={`w-6 h-6 rounded-full bg-white shadow-card transform transition ${data.aiMatch ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
        <span className="text-xs text-secondary">{data.aiMatch ? 'ON' : 'OFF'}</span>
      </div>
      <div>
        <label className="block font-semibold text-primary mb-1">Comments / Notes</label>
        <textarea
          className="glass w-full p-3 rounded-lg focus:ring-2 focus:ring-accent/30"
          placeholder="Any additional notes (optional)"
          value={data.comments}
          onChange={e => onChange('comments', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
}

function validateStep(step, data) {
  const errors = {};
  if (step === 0) {
    if (!data.title) errors.title = 'Project title is required.';
    if (!data.description) errors.description = 'Description is required.';
    if (!data.zone) errors.zone = 'Zone is required.';
  }
  if (step === 1) {
    if (!data.startDate) errors.startDate = 'Start date is required.';
    if (!data.deadline) errors.deadline = 'Deadline is required.';
    if (!data.bidDeadline) errors.bidDeadline = 'Bid deadline is required.';
    if (!data.budget) errors.budget = 'Budget is required.';
  }
  if (step === 2) {
    if (!data.skills || data.skills.length === 0) errors.skills = 'Select at least one skill.';
    if (!data.licenses || data.licenses.length === 0) errors.licenses = 'Select at least one license.';
    if (!data.materials || data.materials.length === 0) errors.materials = 'Add at least one material.';
    if (data.materials && data.materials.some(m => !m.name || !m.qty)) errors.materials = 'Fill all material fields.';
  }
  if (step === 3) {
    if (!data.legal) errors.legal = 'Upload legal papers.';
    if (!data.blueprints) errors.blueprints = 'Upload blueprints/maps.';
    if (!data.boq) errors.boq = 'Upload BOQ.';
    if (!data.safety) errors.safety = 'Upload safety/compliance docs.';
  }
  return errors;
}

export default function CreateProjectForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    title: '',
    description: '',
    zone: '',
    startDate: '',
    deadline: '',
    bidDeadline: '',
    budget: '',
    skills: [],
    licenses: [],
    materials: [],
    legal: null,
    blueprints: null,
    boq: null,
    safety: null,
    aiMatch: false,
    comments: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setData(d => ({ ...d, [field]: value }));
  };

  const next = () => {
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(s => Math.min(s + 1, 4));
  };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setStep(0);
      setData({
        title: '', description: '', zone: '', startDate: '', deadline: '', bidDeadline: '', budget: '', skills: [], licenses: [], materials: [], legal: null, blueprints: null, boq: null, safety: null, aiMatch: false, comments: '',
      });
    }, 1500);
  };

  return (
    <div className="h-full w-full bg-background flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass w-full h-full p-12 shadow-card">
        <StepIndicator step={step} setStep={setStep} />
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <Step1 data={data} onChange={handleChange} errors={errors} />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <Step2 data={data} onChange={handleChange} errors={errors} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <Step3 data={data} onChange={handleChange} errors={errors} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <Step4 data={data} onChange={handleChange} errors={errors} />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <Step5 data={data} onChange={handleChange} />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button type="button" onClick={prev} disabled={step === 0} className="px-6 py-2 rounded-lg bg-border text-primary font-semibold shadow-card disabled:opacity-40 disabled:cursor-not-allowed">Back</button>
            {step < 4 ? (
              <button type="button" onClick={next} className="px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow-card hover:scale-105 transition">Next</button>
            ) : (
              <button type="submit" className="px-8 py-2 rounded-lg bg-accent text-white font-semibold shadow-card hover:scale-105 transition flex items-center gap-2 min-w-[120px] justify-center">
                {loading ? <span className="loader border-t-2 border-b-2 border-white w-5 h-5 rounded-full animate-spin" /> : 'Post Project'}
              </button>
            )}
          </div>
        </form>
        {/* Success Snackbar */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-primary text-white px-6 py-3 rounded-xl shadow-card flex items-center gap-2 z-50"
            >
              <CheckCircle className="text-success" size={24} />
              <span>Project posted successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 