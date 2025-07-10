import React, { useState } from 'react';
import { FileText, FileImage, FileSpreadsheet, Download, Eye, Loader2, CheckCircle, UploadCloud, XCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILE_TYPES = [
  { label: 'Legal Papers', accept: '.pdf', key: 'legal', icon: <FileText className="text-accent" /> },
  { label: 'Blueprints / Maps', accept: '.pdf,.jpg,.jpeg,.png', key: 'blueprints', icon: <FileImage className="text-accent" /> },
  { label: 'BOQ – Bill of Quantity', accept: '.pdf,.xlsx', key: 'boq', icon: <FileSpreadsheet className="text-accent" /> },
  { label: 'Safety & Compliance Docs', accept: '.pdf', key: 'safety', icon: <FileText className="text-accent" /> },
];

const DUMMY_FILES = [
  {
    id: 1,
    name: 'Legal_Agreement.pdf',
    type: 'Legal Paper',
    uploadedBy: 'PM',
    date: '2024-06-10',
    url: '/Legal_Agreement.pdf',
    ext: 'pdf',
    isNew: true,
  },
  {
    id: 2,
    name: 'Site_Blueprint.png',
    type: 'Blueprint',
    uploadedBy: 'Supervisor',
    date: '2024-06-09',
    url: '/Site_Blueprint.png',
    ext: 'image',
    isNew: false,
  },
  {
    id: 3,
    name: 'BOQ_2024.xlsx',
    type: 'BOQ',
    uploadedBy: 'PM',
    date: '2024-06-08',
    url: '/BOQ_2024.xlsx',
    ext: 'xlsx',
    isNew: false,
  },
  {
    id: 4,
    name: 'Safety_Report.pdf',
    type: 'Safety & Compliance',
    uploadedBy: 'Contractor',
    date: '2024-06-07',
    url: '/Safety_Report.pdf',
    ext: 'pdf',
    isNew: false,
  },
];

function getFileIcon(ext) {
  if (ext === 'pdf') return <FileText className="text-error" />;
  if (ext === 'xlsx') return <FileSpreadsheet className="text-success" />;
  if (ext === 'image' || ext === 'jpg' || ext === 'jpeg' || ext === 'png') return <FileImage className="text-accent" />;
  return <FileText className="text-primary" />;
}

function DocumentUploadForm({ onUpload }) {
  const [files, setFiles] = useState({});
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (key, file) => {
    if (file && file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }
    setFiles(f => ({ ...f, [key]: file }));
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Validate at least one file
    if (!Object.values(files).some(f => f)) {
      setError('Please select at least one file to upload.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFiles({});
      setComments('');
      setTimeout(() => setSuccess(false), 2000);
      setError('');
      // Simulate upload
      onUpload(files, comments);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 mb-8">
      <div className="text-lg font-bold text-primary mb-4">Upload Project Documents</div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FILE_TYPES.map(ft => (
            <div key={ft.key}>
              <label className="block font-semibold text-primary mb-1 flex items-center gap-2">{ft.icon} {ft.label}</label>
              <label className="flex flex-col items-center px-6 py-8 glass border-2 border-dashed border-accent/30 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-card">
                <UploadCloud className="text-accent mb-2" size={28} />
                <span className="text-accent font-medium mb-2">Click or drag to upload</span>
                <input type="file" accept={ft.accept} className="hidden" onChange={e => handleFile(ft.key, e.target.files[0])} />
                {files[ft.key] && <span className="text-secondary mt-2">{files[ft.key].name}</span>}
              </label>
            </div>
          ))}
        </div>
        <div>
          <label className="block font-semibold text-primary mb-1">Comments / Notes</label>
          <textarea
            className="glass w-full p-3 rounded-lg border border-border focus:ring-2 focus:ring-accent/30"
            placeholder="Any additional notes (optional)"
            value={comments}
            onChange={e => setComments(e.target.value)}
            rows={2}
          />
        </div>
        {error && <div className="text-error text-xs mb-2">{error}</div>}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-2 rounded-lg bg-primary text-white font-semibold shadow-card hover:scale-105 transition flex items-center gap-2 min-w-[180px] justify-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Upload Documents'}
          </button>
        </div>
      </form>
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
            <span>Document uploaded successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DocumentTable({ files, onView, onDownload, search, setSearch }) {
  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.type.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="text-lg font-bold text-primary">Uploaded Documents</div>
        <div className="flex items-center gap-2 bg-[#F7F9FC] rounded-lg px-3 py-1 border border-border">
          <Search className="text-accent" size={18} />
          <input
            className="bg-transparent outline-none text-primary text-sm"
            placeholder="Search by file name or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-primary bg-[#F7F9FC]">
            <th className="py-2 px-3 text-left font-semibold">File Name</th>
            <th className="py-2 px-3 text-left font-semibold">Type</th>
            <th className="py-2 px-3 text-left font-semibold">Uploaded By</th>
            <th className="py-2 px-3 text-left font-semibold">Date</th>
            <th className="py-2 px-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(f => (
            <tr key={f.id} className="border-b last:border-0">
              <td className="py-2 px-3 flex items-center gap-2">
                {getFileIcon(f.ext)}
                <span className="font-medium text-primary">{f.name}</span>
                {f.isNew && <span className="ml-2 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">New Upload</span>}
              </td>
              <td className="py-2 px-3">{f.type}</td>
              <td className="py-2 px-3">{f.uploadedBy}</td>
              <td className="py-2 px-3">{f.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="text-accent hover:underline flex items-center gap-1" onClick={() => onView(f)}><Eye size={16} /> View</button>
                <button className="text-primary hover:text-accent flex items-center gap-1" onClick={() => onDownload(f)}><Download size={16} /> Download</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={5} className="text-center text-secondary py-8">No documents found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function FilePreviewModal({ open, file, onClose }) {
  if (!open || !file) return null;
  const isImage = file.ext === 'image' || file.name.match(/\.(jpg|jpeg|png)$/i);
  const isPDF = file.ext === 'pdf' || file.name.match(/\.pdf$/i);
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-card relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <button className="absolute top-3 right-3 text-secondary hover:text-error" onClick={onClose}><XCircle size={24} /></button>
          <div className="font-bold text-lg text-primary mb-4">{file.name}</div>
          {isImage ? (
            <img src={file.url} alt={file.name} className="w-full max-h-[60vh] object-contain rounded-lg" />
          ) : isPDF ? (
            <iframe src={file.url} title={file.name} className="w-full h-[60vh] rounded-lg border" />
          ) : (
            <div className="text-secondary">Preview not available for this file type.</div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function DocumentsBlueprints() {
  const [files, setFiles] = useState(DUMMY_FILES);
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState(null);

  // Simulate upload (add to file list)
  const handleUpload = (uploadedFiles, comments) => {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const newFiles = Object.entries(uploadedFiles)
      .filter(([_, file]) => file)
      .map(([key, file]) => {
        let ext = 'pdf';
        if (file.name.match(/\.(jpg|jpeg|png)$/i)) ext = 'image';
        if (file.name.match(/\.xlsx$/i)) ext = 'xlsx';
        return {
          id: Math.random().toString(36).slice(2),
          name: file.name,
          type: FILE_TYPES.find(ft => ft.key === key)?.label || 'Other',
          uploadedBy: 'PM',
          date,
          url: URL.createObjectURL(file),
          ext,
          isNew: true,
        };
      });
    setFiles(f => [...newFiles, ...f.map(file => ({ ...file, isNew: false }))]);
  };

  // Simulate download
  const handleDownload = file => {
    // For demo, just open the file in a new tab
    window.open(file.url, '_blank');
  };

  return (
    <div className="h-full w-full bg-[#F7F9FC] p-0 m-0">
      <div className="w-full h-full">
        {/* Section 1: Upload Area (PM only) */}
        <DocumentUploadForm onUpload={handleUpload} />
        {/* Section 2: Uploaded Documents Table */}
        <DocumentTable files={files} onView={setPreview} onDownload={handleDownload} search={search} setSearch={setSearch} />
        {/* File Preview Modal */}
        <FilePreviewModal open={!!preview} file={preview} onClose={() => setPreview(null)} />
      </div>
    </div>
  );
} 