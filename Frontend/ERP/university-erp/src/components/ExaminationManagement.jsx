import React, { useState, useEffect } from 'react';
import { FileText, Save, CheckCircle } from 'lucide-react';
import './ExaminationManagement.css';

export default function ExaminationManagement() {
  // 1. Core Data State
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  
  // 2. Grading State
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [grades, setGrades] = useState(() => {
    const savedGrades = localStorage.getItem('erp_grades');
    return savedGrades ? JSON.parse(savedGrades) : {};
  });

  // 3. Load Data from Local Storage
  useEffect(() => {
    const savedCourses = localStorage.getItem('erp_courses');
    const savedStudents = localStorage.getItem('erp_students');
    const savedEnrollments = localStorage.getItem('erp_enrollments');

    if (savedCourses) setCourses(JSON.parse(savedCourses));
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedEnrollments) setEnrollments(JSON.parse(savedEnrollments));
  }, []);

  // 4. Auto-save Grades to Local Storage
  useEffect(() => {
    localStorage.setItem('erp_grades', JSON.stringify(grades));
  }, [grades]);

  // Derive students enrolled in the currently selected course
  const enrolledStudents = enrollments
    .filter(enr => enr.courseId === selectedCourseId)
    .map(enr => {
      const student = students.find(s => s.id.toString() === enr.studentId.toString());
      return { ...student, enrollmentId: enr.id };
    })
    .filter(s => s.name); // Ensure the student exists

  // Standard Grading Algorithm
  const calculateGrade = (marks) => {
    if (marks === '' || isNaN(marks)) return '-';
    const m = parseInt(marks, 10);
    if (m >= 80) return 'A';
    if (m >= 65) return 'B';
    if (m >= 55) return 'C';
    if (m >= 35) return 'S';
    return 'F';
  };

  const handleMarksChange = (enrollmentId, value) => {
    // Restrict input between 0 and 100
    let numericValue = parseInt(value, 10);
    if (numericValue > 100) numericValue = 100;
    if (numericValue < 0) numericValue = 0;
    
    const finalValue = isNaN(numericValue) ? '' : numericValue;

    setGrades(prev => ({
      ...prev,
      [enrollmentId]: {
        marks: finalValue,
        grade: calculateGrade(finalValue),
        status: 'Draft'
      }
    }));
  };

  const handlePublishResults = () => {
    if (!selectedCourseId || enrolledStudents.length === 0) return;
    
    const updatedGrades = { ...grades };
    enrolledStudents.forEach(student => {
      if (updatedGrades[student.enrollmentId]) {
        updatedGrades[student.enrollmentId].status = 'Published';
      }
    });
    
    setGrades(updatedGrades);
    alert('Results published successfully. Transcripts updated.');
  };

  return (
    <div className="module-container">
      
      {/* Top Controls: Course Selection */}
      <div className="controls-section grading-controls">
        <div className="glass-card selection-card">
          <FileText size={20} className="header-icon" />
          <select 
            className="course-selector"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">-- Select Course to Grade --</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
        </div>
        
        {selectedCourseId && enrolledStudents.length > 0 && (
          <button className="action-btn publish-btn" onClick={handlePublishResults}>
            <Save size={18} /> Publish Results
          </button>
        )}
      </div>

      {/* Grading Matrix */}
      <div className="glass-card table-card">
        <h3 className="table-title">
          {selectedCourseId ? 'Examination Grading Sheet' : 'Awaiting Course Selection'}
        </h3>
        
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Major</th>
                <th style={{ width: '150px' }}>Marks (0-100)</th>
                <th style={{ textAlign: 'center' }}>Final Grade</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {!selectedCourseId ? (
                <tr>
                  <td colSpan="6" className="empty-state">Please select a course from the dropdown above to load the grading sheet.</td>
                </tr>
              ) : enrolledStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">No students are currently enrolled in this course.</td>
                </tr>
              ) : (
                enrolledStudents.map((student) => {
                  const record = grades[student.enrollmentId] || { marks: '', grade: '-', status: 'Pending' };
                  
                  return (
                    <tr key={student.enrollmentId}>
                      <td><strong>{student.studentId}</strong></td>
                      <td>{student.name}</td>
                      <td>{student.major}</td>
                      <td>
                        <input 
                          type="number" 
                          className="marks-input"
                          placeholder="0"
                          value={record.marks}
                          onChange={(e) => handleMarksChange(student.enrollmentId, e.target.value)}
                          disabled={record.status === 'Published'}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`grade-badge grade-${record.grade.toLowerCase()}`}>
                          {record.grade}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                          {record.status === 'Published' && <CheckCircle size={12} style={{marginRight: '4px', display: 'inline-block', verticalAlign: 'middle'}}/>}
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}