import React, { useState } from 'react';
import { Flag, Search, ChevronDown } from 'lucide-react';

const STATUS_COLORS = {
  Ongoing: 'bg-accent text-white',
  Completed: 'bg-success text-white',
  Delayed: 'bg-error text-white',
};

const dummyProjects = [
  {
    id: 1,
    title: 'Bridge Construction Phase 1',
    contractor: 'ABC Infra Ltd.',
    supervisor: 'John Doe',
    budgetUsed: 4500000,
    budgetTotal: 6000000,
    status: 'Ongoing',
    startDate: '2025-06-01',
    deadline: '2025-12-31',
    flagged: false,
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'School Renovation',
    contractor: 'BuildPro',
    supervisor: 'Jane Smith',
    budgetUsed: 2000000,
    budgetTotal: 2000000,
    status: 'Completed',
    startDate: '2024-01-15',
    deadline: '2024-07-30',
    flagged: false,
    thumbnail: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Highway Expansion',
    contractor: 'XYZ Corp.',
    supervisor: 'Amit Kumar',
    budgetUsed: 3500000,
    budgetTotal: 5000000,
    status: 'Delayed',
    startDate: '2025-03-10',
    deadline: '2025-09-15',
    flagged: true,
    thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
  },
  // Add more dummy projects as needed
];

const statusOptions = ['All', 'Ongoing', 'Completed', 'Delayed'];
const sortOptions = [
  { label: 'Start Date', value: 'startDate' },
  { label: 'Deadline', value: 'deadline' },
  { label: 'Budget Used', value: 'budgetUsed' },
];

function ProjectCard({ project, onClick }) {
  const percentUsed = Math.round((project.budgetUsed / project.budgetTotal) * 100);
  return (
    <div
      className="glass flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg shadow-card group"
      onClick={() => onClick(project)}
    >
      <div className="relative h-40 w-full rounded-t-xl overflow-hidden bg-border">
        <img
          src={project.thumbnail}
          alt="Project Thumbnail"
          className="object-cover w-full h-full group-hover:opacity-90 transition"
        />
        {project.flagged && (
          <Flag className="absolute top-2 right-2 text-error bg-white rounded-full p-1 w-7 h-7 shadow" />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-bold text-lg text-primary truncate" title={project.title}>{project.title}</h3>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[project.status]}`}>{project.status}</span>
        </div>
        <div className="text-sm text-secondary flex flex-col gap-1">
          <span><span className="font-semibold text-text">Contractor:</span> {project.contractor}</span>
          <span><span className="font-semibold text-text">Supervisor:</span> {project.supervisor}</span>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-secondary">Budget Used</span>
            <span className="text-secondary">{percentUsed}%</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-primary font-semibold">₹{project.budgetUsed.toLocaleString()}</span>
            <span className="text-secondary">/ ₹{project.budgetTotal.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <span className="text-secondary">{project.startDate}</span>
          <span className="text-secondary">|</span>
          <span className="text-secondary">{project.deadline}</span>
        </div>
      </div>
    </div>
  );
}

const AllProjects = () => {
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('startDate');
  const [search, setSearch] = useState('');

  const filtered = dummyProjects
    .filter(p => status === 'All' || p.status === status)
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.contractor.toLowerCase().includes(search.toLowerCase()) ||
      p.supervisor.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'budgetUsed') return b.budgetUsed - a.budgetUsed;
      if (sort === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      return new Date(a.startDate) - new Date(b.startDate);
    });

  const handleCardClick = (project) => {
    alert(`Project detail view for: ${project.title}`);
  };

  return (
    <div className="h-full w-full bg-[#F7F9FC] p-0 m-0">
      <div className="w-full h-full">
        {/* Filter/Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              className="glass px-4 py-2 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-accent/30"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="relative">
              <select
                className="glass px-3 py-2 rounded-lg focus:ring-2 focus:ring-accent/30 text-primary font-semibold"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                className="glass px-3 py-2 pr-8 rounded-lg focus:ring-2 focus:ring-accent/30 text-primary font-semibold appearance-none"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={18} />
            </div>
          </div>
        </div>
        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} onClick={handleCardClick} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-secondary py-12">No projects found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProjects; 