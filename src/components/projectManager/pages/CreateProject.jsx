import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from '../components/createProject/StepIndicator';
import BasicInfoForm from '../components/createProject/BasicInfoForm';
import TimelineBudgetForm from '../components/createProject/TimelineBudgetForm';
import RequirementsForm from '../components/createProject/RequirementsForm';
import DocumentUploadForm from '../components/createProject/DocumentUploadForm';
import OtherSettingsForm from '../components/createProject/OtherSettingsForm';
import validateProjectForm from '../components/createProject/validateProjectForm';
import { ProjectContext } from '../projectContext';

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
  const { addProject } = useContext(ProjectContext);

  const handleChange = (field, value) => {
    setData(d => ({ ...d, [field]: value }));
  };

  const next = () => {
    const errs = validateProjectForm(step, data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(s => Math.min(s + 1, 4));
  };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validateProjectForm(step, data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Send new project to context
      addProject({
        id: Date.now(),
        title: data.title,
        status: 'On Bidding',
        createdAt: new Date().toISOString(),
        zone: data.zone,
        contractor: '',
        supervisor: '',
        supplier: '',
        budgetUsed: 0,
        budgetTotal: Number(data.budget) || 0,
        startDate: data.startDate,
        deadline: 'TBD',
        thumbnail: '',
      });
      setStep(0);
      setData({
        title: '', description: '', zone: '', startDate: '', deadline: '', bidDeadline: '', budget: '', skills: [], licenses: [], materials: [], legal: null, blueprints: null, boq: null, safety: null, aiMatch: false, comments: '',
      });
    }, 1500);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent w-full text-start mb-4">
        Create New Project
      </h1>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full min-w-5xl min-h-[95vh] overflow-y-auto bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
        <StepIndicator step={step} setStep={setStep} />
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="basic-info" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <BasicInfoForm data={data} onChange={handleChange} errors={errors} />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="timeline-budget" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <TimelineBudgetForm data={data} onChange={handleChange} errors={errors} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="requirements" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <RequirementsForm data={data} onChange={handleChange} errors={errors} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="document-upload" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <DocumentUploadForm data={data} onChange={handleChange} errors={errors} />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="other-settings" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <OtherSettingsForm data={data} onChange={handleChange} />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button type="button" onClick={prev} className="px-6 py-2 rounded-lg bg-slate-700/50 text-white font-semibold hover:bg-slate-600 transition">Back</button>
            )}
            {step < 4 && (
              <button type="button" onClick={next} className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold hover:from-emerald-500 hover:to-cyan-500 transition">Next</button>
            )}
            {step === 4 && (
              <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold hover:from-emerald-500 hover:to-cyan-500 transition" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
            )}
          </div>
          {success && <div className="text-success font-semibold mt-4">Project created successfully!</div>}
        </form>
      </motion.div>
    </div>
  );
} 