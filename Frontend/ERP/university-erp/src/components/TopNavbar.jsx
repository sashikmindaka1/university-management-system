import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import './TopNavbar.css';

const TopNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- THE FIX: Reading the REAL role from your login system ---
  const activeRole = localStorage.getItem("active_session_role") || "Student";

  const getUserDetails = (role) => {
    // Normalizing the text so "Admin", "admin", and "ADMIN" all work perfectly
    const normalizedRole = role.toLowerCase();

    if (normalizedRole === "admin") {
      return {
        name: "System Administrator",
        id: "ADM-001",
        department: "IT Operations",
        email: "admin@lumina.edu"
      };
    } else if (normalizedRole === "lecturer" || normalizedRole === "employee") {
      return {
        name: "Sashik Mindaka", 
        id: "LEC-2026-042",
        department: "Software Engineering",
        email: "sashik@lumina.edu"
      };
    } else {
      // Defaults to Student
      return {
        name: "Nimsara Lakmal Lekamge",
        id: "STU-2026-001",
        department: "Software Engineering",
        email: "nimsara@lumina.edu"
      };
    }
  };

  const user = getUserDetails(activeRole);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="top-navbar">
      <div className="navbar-spacer"></div>

      <div className="profile-container">
        <div 
          className="profile-trigger" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="nav-avatar">{user.name.charAt(0)}</div>
          <span className="nav-user-name">{user.name}</span>
        </div>

        {isDropdownOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <h4>{user.name}</h4>
              <span className="dropdown-badge">{activeRole}</span>
            </div>
            
            <div className="dropdown-body">
              <div className="dropdown-item">
                <span>ID:</span> <strong>{user.id}</strong>
              </div>
              <div className="dropdown-item">
                <span>Dept:</span> <strong>{user.department}</strong>
              </div>
              <div className="dropdown-item">
                <span>Email:</span> <strong>{user.email}</strong>
              </div>
            </div>

            <div className="dropdown-footer">
              <button className="dropdown-logout-btn" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;