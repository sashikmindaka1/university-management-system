import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import './AttendanceManagement.css';

export default function AttendanceManagement() {
  // 1. Pull existing students from local storage
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // 2. State to hold attendance records (Format: { studentId: 'Present' | 'Absent' })
  const [attendanceRecord, setAttendanceRecord] = useState({});

  useEffect(() => {
    const savedStudents = localStorage.getItem('erp_students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Toggle a student's status between Present and Absent
  const toggleStatus = (studentId) => {
    setAttendanceRecord(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleSaveAttendance = () => {
    // In a real app, this would be an Axios POST request to your Spring Boot backend
    alert(`Attendance for ${selectedDate} saved successfully!`);
  };

  return (
    <div className="module-container">
      
      {/* Top Controls */}
      <div className="controls-section attendance-controls">
        <div className="date-picker-wrapper">
          <CalendarIcon className="input-icon" size={18} />
          <input 
            type="date" 
            className="date-picker"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        
        <div className="module-stats">
          <span className="stat-badge">Total Enrolled: {students.length}</span>
        </div>
      </div>

      {/* Attendance Grid */}
      <div className="glass-card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Batch</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'center' }}>Mark Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => {
                  const status = attendanceRecord[student.studentId] || 'Pending';
                  
                  return (
                    <tr key={student.id}>
                      <td><strong>{student.studentId}</strong></td>
                      <td>{student.name}</td>
                      <td>{student.batch}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`status-badge ${status.toLowerCase()}`}>
                          {status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="action-toggles">
                          <button 
                            className={`toggle-btn present ${status === 'Present' ? 'active' : ''}`}
                            onClick={() => toggleStatus(student.studentId)}
                          >
                            <CheckCircle size={16} /> Present
                          </button>
                          <button 
                            className={`toggle-btn absent ${status === 'Absent' ? 'active' : ''}`}
                            onClick={() => toggleStatus(student.studentId)}
                          >
                            <XCircle size={16} /> Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No students found. Please register students in the Student Management module first.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      {students.length > 0 && (
        <div className="action-footer">
          <button className="action-btn add-btn" onClick={handleSaveAttendance}>
            Save Daily Record
          </button>
        </div>
      )}

    </div>
  );
}