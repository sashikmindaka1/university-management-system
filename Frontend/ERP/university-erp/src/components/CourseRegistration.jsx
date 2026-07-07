import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, UserPlus, Trash2, GraduationCap } from 'lucide-react';
import './CourseRegistration.css';

export default function CourseRegistration() {
  // 1. Load Data from Local Storage
  const [students, setStudents] = useState([]);
  
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('erp_courses');
    return savedCourses ? JSON.parse(savedCourses) : [
      { id: 'C-101', code: 'SE101', name: 'Intro to Software Engineering', credits: 3 },
      { id: 'C-102', code: 'CS204', name: 'Database Management Systems', credits: 4 }
    ];
  });

  const [enrollments, setEnrollments] = useState(() => {
    const savedEnrollments = localStorage.getItem('erp_enrollments');
    return savedEnrollments ? JSON.parse(savedEnrollments) : [];
  });

  // 2. Form States
  const [newCourse, setNewCourse] = useState({ code: '', name: '', credits: '' });
  const [newEnrollment, setNewEnrollment] = useState({ studentId: '', courseId: '' });

  // 3. Sync with Local Storage
  useEffect(() => {
    const savedStudents = localStorage.getItem('erp_students');
    if (savedStudents) setStudents(JSON.parse(savedStudents));
  }, []);

  useEffect(() => {
    localStorage.setItem('erp_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('erp_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  // 4. Handlers
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.name) return;
    
    const courseToAdd = { 
      ...newCourse, 
      id: `C-${Date.now()}` 
    };
    
    setCourses([...courses, courseToAdd]);
    setNewCourse({ code: '', name: '', credits: '' });
  };

  const handleEnrollStudent = (e) => {
    e.preventDefault();
    if (!newEnrollment.studentId || !newEnrollment.courseId) return;

    // Prevent duplicate enrollments
    const isDuplicate = enrollments.some(
      (enr) => enr.studentId === newEnrollment.studentId && enr.courseId === newEnrollment.courseId
    );

    if (isDuplicate) {
      alert("This student is already enrolled in this course.");
      return;
    }

    const enrollmentRecord = {
      id: `E-${Date.now()}`,
      studentId: newEnrollment.studentId,
      courseId: newEnrollment.courseId,
      date: new Date().toLocaleDateString()
    };

    setEnrollments([...enrollments, enrollmentRecord]);
    setNewEnrollment({ studentId: '', courseId: '' });
  };

  const handleDeleteEnrollment = (id) => {
    setEnrollments(enrollments.filter(enr => enr.id !== id));
  };

  // Helper functions to get names from IDs
  const getStudentName = (id) => students.find(s => s.id.toString() === id.toString())?.name || 'Unknown Student';
  const getCourseName = (id) => courses.find(c => c.id === id)?.name || 'Unknown Course';

  return (
    <div className="module-container">
      
      {/* Top Section: Dual Forms */}
      <div className="registration-grid">
        
        {/* Form 1: Add New Course */}
        <div className="glass-card form-card">
          <div className="card-header">
            <BookOpen size={20} className="header-icon" />
            <h3>Create Course</h3>
          </div>
          <form onSubmit={handleAddCourse} className="stacked-form">
            <input 
              type="text" placeholder="Course Code (e.g., SE301)" 
              value={newCourse.code} onChange={(e) => setNewCourse({...newCourse, code: e.target.value})} required 
            />
            <input 
              type="text" placeholder="Course Title" 
              value={newCourse.name} onChange={(e) => setNewCourse({...newCourse, name: e.target.value})} required 
            />
            <input 
              type="number" placeholder="Credit Value" min="1" max="6"
              value={newCourse.credits} onChange={(e) => setNewCourse({...newCourse, credits: e.target.value})} required 
            />
            <button type="submit" className="action-btn add-btn">
              <Plus size={18} /> Add to Catalog
            </button>
          </form>
        </div>

        {/* Form 2: Enroll Student */}
        <div className="glass-card form-card">
          <div className="card-header">
            <UserPlus size={20} className="header-icon" />
            <h3>Process Enrollment</h3>
          </div>
          <form onSubmit={handleEnrollStudent} className="stacked-form">
            <select 
              value={newEnrollment.studentId} 
              onChange={(e) => setNewEnrollment({...newEnrollment, studentId: e.target.value})} required
            >
              <option value="">-- Select Student --</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.studentId} - {s.name}</option>)}
            </select>

            <select 
              value={newEnrollment.courseId} 
              onChange={(e) => setNewEnrollment({...newEnrollment, courseId: e.target.value})} required
            >
              <option value="">-- Select Course --</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
            </select>

            <button type="submit" className="action-btn enroll-btn">
              <GraduationCap size={18} /> Confirm Registration
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Section: Active Enrollments Ledger */}
      <div className="glass-card table-card">
        <h3 className="table-title">Active Course Registrations</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Registration ID</th>
                <th>Student Name</th>
                <th>Course Enrolled</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length > 0 ? (
                enrollments.map((record) => (
                  <tr key={record.id}>
                    <td><span className="mono-text">{record.id}</span></td>
                    <td><strong>{getStudentName(record.studentId)}</strong></td>
                    <td>{getCourseName(record.courseId)}</td>
                    <td>{record.date}</td>
                    <td>
                      <button className="icon-btn delete-btn" onClick={() => handleDeleteEnrollment(record.id)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">No enrollments processed yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}