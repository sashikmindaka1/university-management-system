import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Briefcase, Users, BookOpen, CheckCircle } from 'lucide-react';
import './EmployeePortal.css';

export default function EmployeePortal() {
  const navigate = useNavigate();
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [systemStats, setSystemStats] = useState({ totalStudents: 0, activeCourses: 0 });

  useEffect(() => {
    // Fetch data from local storage
    const employeesData = JSON.parse(localStorage.getItem('erp_employees') || '[]');
    const studentsData = JSON.parse(localStorage.getItem('erp_students') || '[]');
    const coursesData = JSON.parse(localStorage.getItem('erp_courses') || '[]');

    // Simulate logged-in faculty (Grab the first available employee)
    if (employeesData.length > 0) {
      setActiveEmployee(employeesData[0]);
    }

    setSystemStats({
      totalStudents: studentsData.length,
      activeCourses: coursesData.length
    });
  }, []);

  return (
    <div className="dashboard-layout">
      
      {/* Sidebar */}
      <nav className="glass-sidebar">
        <div className="sidebar-logo">
          <h2>Lumina</h2>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-item active">
            <Briefcase size={20} />
            <span>Staff Dashboard</span>
          </a>
        </div>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate('/')}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="content-header">
          <h1>staff Portal</h1>
          <p>Welcome back, Professor {activeEmployee ? activeEmployee.name : 'Staff'}.</p>
        </header>

        <div className="content-area">
          
          {/* Profile Summary Card */}
          {activeEmployee ? (
            <div className="glass-card profile-summary-card faculty-card">
              <div className="profile-details">
                <div className="profile-item">
                  <span className="profile-label">Staff ID</span>
                  <span className="profile-value mono-text">{activeEmployee.empId}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Department</span>
                  <span className="profile-value">{activeEmployee.department}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Designation</span>
                  <span className="profile-value">{activeEmployee.role}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">System Access</span>
                  <span className="profile-value status-badge active" style={{ display: 'inline-block' }}>Granted</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card placeholder-card">
              <h3>No Faculty Profile Found</h3>
              <p>Please register an employee in the Admin dashboard first.</p>
            </div>
          )}

          {/* Quick Actions & Stats Grid */}
          <div className="faculty-grid">
            
            <div className="glass-card action-card">
              <div className="action-icon-wrapper blue">
                <Users size={28} />
              </div>
              <div className="action-info">
                <h3>{systemStats.totalStudents} Enrolled</h3>
                <p>Total students across all university programs.</p>
              </div>
            </div>

            <div className="glass-card action-card">
              <div className="action-icon-wrapper purple">
                <BookOpen size={28} />
              </div>
              <div className="action-info">
                <h3>{systemStats.activeCourses} Active Courses</h3>
                <p>Total courses currently running this semester.</p>
              </div>
            </div>

            <div className="glass-card action-card">
              <div className="action-icon-wrapper green">
                <CheckCircle size={28} />
              </div>
              <div className="action-info">
                <h3>Grading Open</h3>
                <p>The examination portal is open for submissions.</p>
              </div>
            </div>

          </div>

          {/* Notice Board */}
          <div className="glass-card notice-card">
            <div className="card-header">
              <h3>Faculty Notice Board</h3>
            </div>
            <div className="notice-list">
              <div className="notice-item">
                <span className="notice-date">Today</span>
                <p>Please finalize all midterm grades by Friday at 5:00 PM.</p>
              </div>
              <div className="notice-item">
                <span className="notice-date">Yesterday</span>
                <p>Department meeting scheduled for next Tuesday regarding new curriculum updates.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}