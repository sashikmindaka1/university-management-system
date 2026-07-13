import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Briefcase,
  Users,
  BookOpen,
  FileText,
  CalendarCheck,
  Settings,
  LogOut
} from "lucide-react";

import Overview from "./Overview";
import EmployeeManagement from "./EmployeeManagement";
import StudentManagement from "./StudentManagement";
import CourseRegistration from "./CourseRegistration";
import ExaminationManagement from "./ExaminationManagement";
import AttendanceManagement from "./AttendanceManagement";
import SettingsPanel from "./SettingsPanel";
import TopNavbar from './TopNavbar';
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("Overview");

  // GLOBAL SECURITY: Allows Admin, Student, and Employee roles
  useEffect(() => {
    const role = localStorage.getItem("active_session_role");

    // If there is NO role (user is not logged in at all), kick them to the login screen
    if (!role) {
      navigate("/", {
        replace: true
      });
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/", {
      replace: true
    });
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeModule) {
      case "Employees":
        return <EmployeeManagement />;
      case "Students":
        return <StudentManagement />;
      case "Courses":
        return <CourseRegistration />;
      case "Examinations":
        return <ExaminationManagement />;
      case "Attendance":
        return <AttendanceManagement />;
      case "Settings":
        return <SettingsPanel />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard-layout">
      <nav className="glass-sidebar">
        <div className="sidebar-logo">
          <h2>Lumina</h2>
        </div>

        <div className="nav-links">
          {[
            ["Overview", LayoutDashboard],
            ["Employees", Briefcase],
            ["Students", Users],
            ["Courses", BookOpen],
            ["Examinations", FileText],
            ["Attendance", CalendarCheck],
            ["Settings", Settings]
          ].map(([name, Icon]) => (
            <a
              key={name}
              href="#!"
              className={`nav-item ${activeModule === name ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveModule(name);
              }}
            >
              <Icon size={20} />
              <span>{name}</span>
            </a>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        
        {/* --- TOP NAVBAR --- */}
        <TopNavbar />

        <header className="content-header">
          <h1>{activeModule}</h1>
          <p>Manage {activeModule}</p>
        </header>

        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}