import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Save, AlertTriangle } from 'lucide-react';
import './SettingsPanel.css';

export default function SettingsPanel() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('erp_admin_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Admin User',
      email: 'admin@university.edu',
      role: 'Super Administrator'
    };
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    systemUpdates: true
  });

  useEffect(() => {
    localStorage.setItem('erp_admin_profile', JSON.stringify(profile));
  }, [profile]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Admin profile updated successfully!');
  };

  const handleFactoryReset = () => {
    const confirmReset = window.confirm(
      "WARNING: This will permanently delete all Students, Courses, Employees, and Grades from your local database. Are you sure?"
    );
    if (confirmReset) {
      localStorage.clear();
      alert('System wiped. Please refresh the page to start fresh.');
      window.location.reload();
    }
  };

  return (
    <div className="module-container settings-container">
      
      <div className="settings-grid">
        {/* Left Column: Profile & Notifications */}
        <div className="settings-column">
          
          <div className="glass-card settings-card">
            <div className="card-header">
              <User size={20} className="header-icon" />
              <h3>Admin Profile</h3>
            </div>
            <form onSubmit={handleSaveProfile} className="settings-form">
              <div className="input-group">
                <label>Display Name</label>
                <input type="text" name="name" value={profile.name} onChange={handleProfileChange} required />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" name="email" value={profile.email} onChange={handleProfileChange} required />
              </div>
              <div className="input-group">
                <label>System Role</label>
                <input type="text" name="role" value={profile.role} disabled className="disabled-input" />
              </div>
              <button type="submit" className="action-btn save-btn">
                <Save size={18} /> Save Profile
              </button>
            </form>
          </div>

          <div className="glass-card settings-card">
            <div className="card-header">
              <Bell size={20} className="header-icon" />
              <h3>Notification Preferences</h3>
            </div>
            <div className="toggle-list">
              <div className="toggle-item">
                <span>Email Alerts for New Enrollments</span>
                <input type="checkbox" checked={notifications.emailAlerts} onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})} />
              </div>
              <div className="toggle-item">
                <span>SMS Alerts for Security Events</span>
                <input type="checkbox" checked={notifications.smsAlerts} onChange={(e) => setNotifications({...notifications, smsAlerts: e.target.checked})} />
              </div>
              <div className="toggle-item">
                <span>Receive System Update Logs</span>
                <input type="checkbox" checked={notifications.systemUpdates} onChange={(e) => setNotifications({...notifications, systemUpdates: e.target.checked})} />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Security & Data Management */}
        <div className="settings-column">
          
          <div className="glass-card settings-card">
            <div className="card-header">
              <Shield size={20} className="header-icon" />
              <h3>Security Settings</h3>
            </div>
            <form className="settings-form">
              <div className="input-group">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <button type="button" className="action-btn outline-btn" onClick={() => alert('Password updated!')}>
                Update Password
              </button>
            </form>
          </div>

          <div className="glass-card settings-card danger-zone">
            <div className="card-header">
              <AlertTriangle size={20} className="header-icon danger-icon" />
              <h3 className="danger-text">Danger Zone</h3>
            </div>
            <p className="danger-description">
              Need to clear the prototype data for your presentation? This will wipe all local storage databases including students, employees, and grades.
            </p>
            <button className="action-btn danger-btn" onClick={handleFactoryReset}>
              <AlertTriangle size={18} /> Factory Reset Database
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}