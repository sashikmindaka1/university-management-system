import React, { useState, useEffect } from 'react';
import { Briefcase, UserPlus, Trash2, Search } from 'lucide-react';
import './EmployeeManagement.css';

export default function EmployeeManagement() {
  // 1. Initialize State from LocalStorage with default administrative records
  const [employees, setEmployees] = useState(() => {
    const savedData = localStorage.getItem('erp_employees');
    return savedData ? JSON.parse(savedData) : [
      { id: 1684320000000, empId: 'EMP-001', name: 'Sashik Mindaka', department: 'Software Engineering', role: 'System Administrator' },
      { id: 1684320000001, empId: 'EMP-002', name: 'Sithum Manodhara', department: 'Software Engineering', role: 'Database Architect' }
    ];
  });

  const [newEmployee, setNewEmployee] = useState({
    empId: '',
    name: '',
    department: '',
    role: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  // 2. Auto-save to LocalStorage
  useEffect(() => {
    localStorage.setItem('erp_employees', JSON.stringify(employees));
  }, [employees]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.empId || !newEmployee.name) return;

    const employeeToAdd = { 
      ...newEmployee, 
      id: Date.now(), 
    };

    setEmployees([...employees, employeeToAdd]);
    setNewEmployee({ empId: '', name: '', department: '', role: '' });
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="module-container">
      
      {/* Search Bar */}
      <div className="controls-section">
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by ID, Name, or Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Add Employee Form */}
      <div className="glass-card form-card">
        <div className="card-header">
          <UserPlus size={20} className="header-icon" />
          <h3>Register New Staff Member</h3>
        </div>
        <form onSubmit={handleAddEmployee} className="add-employee-form">
          <input type="text" name="empId" placeholder="Staff ID (e.g., EMP-003)" value={newEmployee.empId} onChange={handleInputChange} required />
          <input type="text" name="name" placeholder="Full Name" value={newEmployee.name} onChange={handleInputChange} required />
          <select name="department" value={newEmployee.department} onChange={handleInputChange} required>
            <option value="">-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Administration">Administration</option>
            <option value="Finance">Finance</option>
          </select>
          <input type="text" name="role" placeholder="Role / Designation" value={newEmployee.role} onChange={handleInputChange} required />
          
          <button type="submit" className="action-btn add-btn">
            <Briefcase size={18} /> Add Record
          </button>
        </form>
      </div>

      {/* Employee Data Table */}
      <div className="glass-card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td><span className="mono-text">{emp.empId}</span></td>
                    <td><strong>{emp.name}</strong></td>
                    <td>{emp.department}</td>
                    <td>{emp.role}</td>
                    <td>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(emp.id)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">No employee records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}