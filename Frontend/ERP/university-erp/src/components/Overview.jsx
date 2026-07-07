import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Briefcase, GraduationCap, Activity, Server } from 'lucide-react';
import './Overview.css';

export default function Overview() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    employees: 0,
    enrollments: 0
  });

  // Fetch data from local storage on load
  useEffect(() => {
    const fetchCount = (key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data).length : 0;
    };

    setStats({
      students: fetchCount('erp_students'),
      courses: fetchCount('erp_courses'),
      employees: fetchCount('erp_employees'),
      enrollments: fetchCount('erp_enrollments')
    });
  }, []);

  return (
    <div className="module-container overview-container">
      
      {/* Top Section: System Health */}
      <div className="glass-card system-health-card">
        <div className="health-indicator">
          <div className="pulse-dot"></div>
          <span className="health-text">System Status: All Services Operational</span>
        </div>
        <div className="server-info">
          <Server size={16} />
          <span>Local Storage Environment (React Mode)</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid">
        
        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper blue">
            <Users size={24} className="stat-icon" />
          </div>
          <div className="stat-details">
            <h4>Total Students</h4>
            <h2>{stats.students}</h2>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper purple">
            <BookOpen size={24} className="stat-icon" />
          </div>
          <div className="stat-details">
            <h4>Active Courses</h4>
            <h2>{stats.courses}</h2>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper green">
            <GraduationCap size={24} className="stat-icon" />
          </div>
          <div className="stat-details">
            <h4>Course Enrollments</h4>
            <h2>{stats.enrollments}</h2>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper orange">
            <Briefcase size={24} className="stat-icon" />
          </div>
          <div className="stat-details">
            <h4>Registered Staff</h4>
            <h2>{stats.employees}</h2>
          </div>
        </div>

      </div>

      {/* Bottom Section: Recent Activity Placeholder */}
      <div className="glass-card activity-card">
        <div className="card-header">
          <Activity size={20} className="header-icon" />
          <h3>System Audit Log</h3>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-bullet blue"></div>
            <p>Admin accessed <strong>Overview</strong> dashboard.</p>
            <span className="activity-time">Just now</span>
          </div>
          <div className="activity-item">
            <div className="activity-bullet green"></div>
            <p>Data synchronization completed successfully.</p>
            <span className="activity-time">2 mins ago</span>
          </div>
          <div className="activity-item">
            <div className="activity-bullet purple"></div>
            <p>Local storage architecture initialized.</p>
            <span className="activity-time">System Startup</span>
          </div>
        </div>
      </div>

    </div>
  );
}