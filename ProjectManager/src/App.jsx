import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardHome from './pages/DashboardHome';
import CreateProject from './pages/CreateProject';
import AllProjects from './pages/AllProjects';
import ViewBids from './pages/ViewBids';
import AssignSupervisorSupplier from './pages/AssignSupervisorSupplier';
import ProjectMonitoring from './pages/ProjectMonitoring';
import FundRequests from './pages/FundRequests';
import DocumentsBlueprints from './pages/DocumentsBlueprints';
import InternalChat from './pages/InternalChat';
import ExportReports from './pages/ExportReports';
import ParticleBackground from './components/ParticleBackground';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

const App = () => (
  <Router>
    <div className="relative min-h-screen flex bg-background text-text font-sans">
      <ParticleBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-80">
        <Topbar />
        <main className="flex-1 p-6 pt-28">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/all-projects" element={<AllProjects />} />
            <Route path="/view-bids" element={<ViewBids />} />
            <Route path="/assign-supervisor-supplier" element={<AssignSupervisorSupplier />} />
            <Route path="/project-monitoring" element={<ProjectMonitoring />} />
            <Route path="/fund-requests" element={<FundRequests />} />
            <Route path="/documents-blueprints" element={<DocumentsBlueprints />} />
            <Route path="/internal-chat" element={<InternalChat />} />
            <Route path="/export-reports" element={<ExportReports />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  </Router>
);

export default App; 