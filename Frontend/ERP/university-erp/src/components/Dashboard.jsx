import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase,
  Users, 
  BookOpen, 
  FileText,
  CalendarCheck,  
  Settings, 
  LogOut 
} from 'lucide-react';

// Import all system modules
import Overview from './Overview';
import EmployeeManagement from './EmployeeManagement';
import StudentManagement from './StudentManagement'; 
import CourseRegistration from './CourseRegistration';
import ExaminationManagement from './ExaminationManagement';
import AttendanceManagement from './AttendanceManagement';
import SettingsPanel from './SettingsPanel'; 

import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // State to track which module is currently active
  const [activeModule, setActiveModule] = useState('Overview');

  // Function to render the correct component based on state
  const renderContent = () => {
    switch (activeModule) {
      case 'Employees':
        return <EmployeeManagement />;
      case 'Students':
        return <StudentManagement />;
      case 'Courses':
        return <CourseRegistration />;
      case 'Examinations':
        return <ExaminationManagement />;
      case 'Attendance':
        return <AttendanceManagement />;
      case 'Settings':
        return <SettingsPanel />;
      case 'Overview':
        return <Overview />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard-layout">
      
      {/* LEFT: The Glass Sidebar */}
      <nav className="glass-sidebar">
        <div className="sidebar-logo">
          <h2>Lumina</h2>
        </div>
        
        <div className="nav-links">
          <a 
            href="#" 
            className={`nav-item ${activeModule === 'Overview' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveModule('Overview'); }}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </a>
          
          <a 
            href="#" 
            className={`nav-item ${activeModule === 'Employees' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveModule('Employees'); }}
          >
            <Briefcase size={20} />
            <span>Employees</span>
          </a>
          
          <a 
            href="#" 
            className={`nav-item ${activeModule === 'Students' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveModule('Students'); }}
          >
            <Users size={20} />
            <span>Students</span>
          </a>
          
          <a 
            href="#" 
            className={`nav-item ${activeModule === 'Courses' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveModule('Courses'); }}
          >
            <BookOpen size={20} />
            <span>Courses</span>
          </a>
          
          <a 
            href="#" 
            className={`nav-item ${activeModule === 'Examinations' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveModule('Examinations'); }}
          >
            <FileText size={20} />
            <span>Examinations</span>
          </a>
          
          <a 
            href="#" 
            className={`nav-item ${activeModule === 'Attendance' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveModule('Attendance'); }}
          >
            <CalendarCheck size={20} />
            <span>Attendance</span>
          </a>

          <a 
            href="#" 
            className={`nav-item ${activeModule === 'Settings' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActiveModule('Settings'); }}
          >
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate('/')}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* RIGHT: The Main Content Area */}
      <main className="dashboard-content">
        <header className="content-header">
          <h1>{activeModule}</h1>
          <p>Manage {activeModule.toLowerCase()} records and administrative data.</p>
        </header>

        <div className="content-area">
          {/* Dynamically inject the active module here */}
          {renderContent()}
        </div>
      </main>

    </div>
  );
}