import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap, BookOpen, Award, CalendarCheck } from 'lucide-react';
import './StudentPortal.css'; 

export default function StudentPortal() {
  const navigate = useNavigate();

  // State to hold the active student's data
  const [activeStudent, setActiveStudent] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [myGrades, setMyGrades] = useState({});

  useEffect(() => {
    // 1. Fetch all data from the Admin databases
    const studentsData = JSON.parse(localStorage.getItem('erp_students') || '[]');
    const coursesData = JSON.parse(localStorage.getItem('erp_courses') || '[]');
    const enrollmentsData = JSON.parse(localStorage.getItem('erp_enrollments') || '[]');
    const gradesData = JSON.parse(localStorage.getItem('erp_grades') || '{}');

    // 2. Simulate logged-in student (Grab the first available student for the demo)
    if (studentsData.length > 0) {
      const student = studentsData[0]; 
      setActiveStudent(student);

      // 3. Find courses this specific student is enrolled in
      const studentEnrollments = enrollmentsData.filter(enr => enr.studentId === student.id.toString() || enr.studentId === student.id);
      
      const enrolledCourseDetails = studentEnrollments.map(enr => {
        const courseInfo = coursesData.find(c => c.id === enr.courseId);
        return {
          ...courseInfo,
          enrollmentId: enr.id,
          enrollmentDate: enr.date
        };
      });

      setMyCourses(enrolledCourseDetails);

      // 4. Extract grades for these specific enrollments
      const studentGrades = {};
      studentEnrollments.forEach(enr => {
        if (gradesData[enr.id] && gradesData[enr.id].status === 'Published') {
          studentGrades[enr.id] = gradesData[enr.id];
        }
      });
      
      setMyGrades(studentGrades);
    }
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
            <GraduationCap size={20} />
            <span>My Academics</span>
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
          <h1>Student Portal</h1>
          <p>Welcome back, {activeStudent ? activeStudent.name : 'Student'}.</p>
        </header>

        <div className="content-area">
          
          {/* Profile Summary Card */}
          {activeStudent ? (
            <div className="glass-card profile-summary-card">
              <div className="profile-details">
                <div className="profile-item">
                  <span className="profile-label">Student ID</span>
                  <span className="profile-value mono-text">{activeStudent.studentId}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Major / Program</span>
                  <span className="profile-value">{activeStudent.major}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Batch</span>
                  <span className="profile-value">{activeStudent.batch}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Academic Standing</span>
                  <span className="profile-value status-badge active" style={{ display: 'inline-block' }}>Good Standing</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card placeholder-card">
              <h3>No Student Profile Found</h3>
              <p>Please register a student in the Admin dashboard first.</p>
            </div>
          )}

          {/* Academic Dashboard Grid (3 Columns) */}
          <div className="academic-grid">
            
            {/* Column 1: Enrolled Courses */}
            <div className="glass-card academic-card">
              <div className="card-header">
                <BookOpen size={20} className="header-icon" />
                <h3>Current Enrollments</h3>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCourses.length > 0 ? (
                      myCourses.map(course => (
                        <tr key={course.id}>
                          <td><strong>{course.code}</strong></td>
                          <td>{course.name}</td>
                          <td>{course.credits}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="empty-state">No active course enrollments.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Column 2: Examination Results */}
            <div className="glass-card academic-card">
              <div className="card-header">
                <Award size={20} className="header-icon" />
                <h3>Official Results</h3>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th style={{ textAlign: 'center' }}>Final Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCourses.length > 0 ? (
                      myCourses.map(course => {
                        const result = myGrades[course.enrollmentId];
                        return (
                          <tr key={`grade-${course.id}`}>
                            <td><strong>{course.code}</strong></td>
                            <td style={{ textAlign: 'center' }}>
                              {result ? (
                                <span className={`grade-badge grade-${result.grade.toLowerCase()}`}>
                                  {result.grade}
                                </span>
                              ) : (
                                <span className="status-badge draft">Pending</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="2" className="empty-state">No results available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Column 3: Attendance Overview */}
            <div className="glass-card academic-card">
              <div className="card-header">
                <CalendarCheck size={20} className="header-icon" />
                <h3>Attendance</h3>
              </div>
              <div className="attendance-summary">
                <div className="attendance-ring">
                  <h2 className="attendance-percentage">88<span>%</span></h2>
                  <p>Overall Present</p>
                </div>
                <div className="attendance-stats">
                  <div className="stat-row">
                    <span>Total Classes:</span>
                    <strong>48</strong>
                  </div>
                  <div className="stat-row">
                    <span>Days Present:</span>
                    <strong className="text-green">42</strong>
                  </div>
                  <div className="stat-row">
                    <span>Days Absent:</span>
                    <strong className="text-red">6</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}