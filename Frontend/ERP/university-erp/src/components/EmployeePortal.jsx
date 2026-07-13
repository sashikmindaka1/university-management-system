import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LogOut,
  Briefcase,
  Users,
  BookOpen,
  CheckCircle
} from "lucide-react";

import { getLecturers } from "../services/lecturerService";

import TopNavbar from './TopNavbar'; /* <-- ADDED TOPNAVBAR IMPORT */
import "./EmployeePortal.css";

export default function EmployeePortal() {

  const navigate = useNavigate();

  const [activeEmployee, setActiveEmployee] = useState(null);
  const [systemStats, setSystemStats] = useState({
    totalStudents: 0,
    activeCourses: 0
  });

  useEffect(() => {
    loadLecturer();
  }, []);

  const loadLecturer = async () => {
    try {
      // Get lecturer from database
      const lecturerData = await getLecturers();

      if (lecturerData.length > 0) {
        setActiveEmployee(lecturerData[0]);
      }

      // Dashboard counts
      const students = JSON.parse(
        localStorage.getItem("erp_students") || "[]"
      );

      const courses = JSON.parse(
        localStorage.getItem("erp_courses") || "[]"
      );

      setSystemStats({
        totalStudents: students.length,
        activeCourses: courses.length
      });

    } catch (error) {
      console.log("Lecturer loading error", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-layout">

      <nav className="glass-sidebar">
        <div className="sidebar-logo">
          <h2>Lumina</h2>
        </div>

        <div className="nav-links">
          <a className="nav-item active">
            <Briefcase size={20} />
            <span>Lecturer Dashboard</span>
          </a>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        
        {/* --- ADDED TOP NAVBAR HERE --- */}
        <TopNavbar />

        <header className="content-header">
          <h1>Lecturer Portal</h1>
          <p>
            Welcome back Professor{" "}
            {activeEmployee ? activeEmployee.name : "Lecturer"}
          </p>
        </header>

        <div className="content-area">

          {activeEmployee &&
            <div className="glass-card profile-summary-card">
              <div className="profile-details">
                <div className="profile-item">
                  <span className="profile-label">Lecturer ID</span>
                  <span className="profile-value">{activeEmployee.lecturerId}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Department</span>
                  <span className="profile-value">{activeEmployee.department}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Specialization</span>
                  <span className="profile-value">{activeEmployee.specialization}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Email</span>
                  <span className="profile-value">{activeEmployee.email}</span>
                </div>
              </div>
            </div>
          }

          <div className="faculty-grid">
            <div className="glass-card action-card">
              <div className="action-icon-wrapper blue">
                <Users size={28} />
              </div>
              <div className="action-info">
                <h3>{systemStats.totalStudents}</h3>
                <p>Total Students</p>
              </div>
            </div>

            <div className="glass-card action-card">
              <div className="action-icon-wrapper purple">
                <BookOpen size={28} />
              </div>
              <div className="action-info">
                <h3>{systemStats.activeCourses}</h3>
                <p>Active Courses</p>
              </div>
            </div>

            <div className="glass-card action-card">
              <div className="action-icon-wrapper green">
                <CheckCircle size={28} />
              </div>
              <div className="action-info">
                <h3>Available</h3>
                <p>Examination System</p>
              </div>
            </div>
          </div>

          <div className="glass-card notice-card">
            <div className="card-header">
              <h3>Lecturer Notice Board</h3>
            </div>
            <div className="notice-list">
              <div className="notice-item">
                <p>You can manage student marks and attendance.</p>
              </div>
              <div className="notice-item">
                <p>Semester examination is open.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}