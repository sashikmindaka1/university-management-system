import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentPortal from './components/StudentPortal';
import EmployeePortal from './components/EmployeePortal';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/employee-portal" element={<EmployeePortal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;