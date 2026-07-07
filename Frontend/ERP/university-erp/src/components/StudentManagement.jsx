
import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import './StudentManagement.css';

export default function StudentManagement() {
  // 1. Initialize State from LocalStorage
  const [students, setStudents] = useState(() => {
    const savedData = localStorage.getItem('erp_students');
    return savedData ? JSON.parse(savedData) : [];
  });

  // 2. Form states for adding a new student
  const [newStudent, setNewStudent] = useState({
    studentId: '',
    name: '',
    major: '',
    batch: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  // 3. Auto-save to LocalStorage whenever the students array changes
  useEffect(() => {
    localStorage.setItem('erp_students', JSON.stringify(students));
  }, [students]);

  // Handle typing in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Add a new student to the array
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.studentId || !newStudent.name) return;

    const studentToAdd = { 
      ...newStudent, 
      id: Date.now(), // Generate a unique ID for React keys
      status: 'Active' 
    };

    setStudents([...students, studentToAdd]);
    
    // Clear the form
    setNewStudent({ studentId: '', name: '', major: '', batch: '' });
  };

  // Delete a student from the array
  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  // Filter the table based on the search bar
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="module-container">
      
      {/* Search Bar */}
      <div className="controls-section">
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by Student ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Add Student Form */}
      <div className="glass-card form-card">
        <h3>Enroll New Student</h3>
        <form onSubmit={handleAddStudent} className="add-student-form">
          <input type="text" name="studentId" placeholder="ID (e.g., STU-001)" value={newStudent.studentId} onChange={handleInputChange} required />
          <input type="text" name="name" placeholder="Full Name" value={newStudent.name} onChange={handleInputChange} required />
          <input type="text" name="major" placeholder="Major / Program" value={newStudent.major} onChange={handleInputChange} required />
          <input type="text" name="batch" placeholder="Batch Year" value={newStudent.batch} onChange={handleInputChange} required />
          
          <button type="submit" className="action-btn add-btn">
            <Plus size={18} /> Add Record
          </button>
        </form>
      </div>

      {/* Data Table */}
      <div className="glass-card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Major</th>
                <th>Batch</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td><strong>{student.studentId}</strong></td>
                    <td>{student.name}</td>
                    <td>{student.major}</td>
                    <td>{student.batch}</td>
                    <td><span className="status-badge active">{student.status}</span></td>
                    <td>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(student.id)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">No students found. Add a new record above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}