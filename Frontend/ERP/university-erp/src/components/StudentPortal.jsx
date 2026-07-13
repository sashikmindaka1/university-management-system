import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {
  LogOut,
  GraduationCap,
  BookOpen,
  Award,
  CalendarCheck
} from "lucide-react";

import {
  getStudent,
  getStudentCourses,
  getStudentResults,
  getStudentAttendance
} from "../services/studentPortalService";

import TopNavbar from './TopNavbar'; /* <-- ADDED TOPNAVBAR IMPORT */
import "./StudentPortal.css";

export default function StudentPortal(){

const navigate = useNavigate();

const [student,setStudent] = useState(null);
const [courses,setCourses] = useState([]);
const [results,setResults] = useState([]);
const [attendance,setAttendance] = useState([]);

const [attendanceStats,setAttendanceStats] = useState({
  total:0,
  present:0,
  absent:0,
  percentage:0
});

// STUDENT SECURITY CHECK
useEffect(()=>{
  const role = localStorage.getItem("active_session_role");

  if(role !== "Student"){
    navigate("/",{
      replace:true
    });
    return;
  }

  loadStudentData();
},[navigate]);

const loadStudentData = async()=>{
  try{
    const user = JSON.parse(localStorage.getItem("active_user"));

    if(!user){
      navigate("/");
      return;
    }

    const studentData = await getStudent(user.id);
    setStudent(studentData);

    const courseData = await getStudentCourses(user.id);
    setCourses(courseData);

    const examData = await getStudentResults(user.id);
    setResults(examData);

    const attendanceData = await getStudentAttendance(user.id);
    setAttendance(attendanceData);

    calculateAttendance(attendanceData);

  } catch(error){
    console.log("Student portal error", error);
  }
};

const calculateAttendance=(data)=>{
  let total=data.length;

  let present = data.filter(
    a=>a.status==="PRESENT"
  ).length;

  let absent = data.filter(
    a=>a.status==="ABSENT"
  ).length;

  let percentage=0;

  if(total>0){
    percentage = Math.round((present/total)*100);
  }

  setAttendanceStats({
    total,
    present,
    absent,
    percentage
  });
};

const logout=()=>{
  localStorage.clear();
  navigate("/",{
    replace:true
  });
  window.location.reload();
};

return(
  <div className="dashboard-layout">

    <nav className="glass-sidebar">
      <div className="sidebar-logo">
        <h2>University ERP</h2>
      </div>

      <div className="nav-links">
        <a className="nav-item active">
          <GraduationCap size={20}/>
          <span>My Academics</span>
        </a>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <LogOut size={20}/>
          <span>Logout</span>
        </button>
      </div>
    </nav>

    <main className="dashboard-content">

      {/* --- ADDED TOP NAVBAR HERE --- */}
      <TopNavbar />

      <header className="content-header">
        <h1>Student Portal</h1>
        <p>Welcome back, {" "} {student?.name || "Student"}</p>
      </header>

      <div className="content-area">
        { student &&
          <div className="glass-card profile-summary-card">
            <div className="profile-details">
              <div className="profile-item">
                <span className="profile-label">Student ID</span>
                <span className="profile-value">{student.studentId}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Name</span>
                <span className="profile-value">{student.name}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Major</span>
                <span className="profile-value">{student.major}</span>
              </div>
              <div className="profile-item">
                <span className="profile-label">Batch</span>
                <span className="profile-value">{student.batch}</span>
              </div>
            </div>
          </div>
        }

        <div className="academic-grid">
          {/* COURSES */}
          <div className="glass-card academic-card">
            <div className="card-header">
              <BookOpen size={20}/>
              <h3>My Courses</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Course</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                { courses.length>0 ?
                  courses.map((enrollment)=>(
                    <tr key={enrollment.id}>
                      <td><strong>{enrollment.course.courseCode}</strong></td>
                      <td>{enrollment.course.courseName}</td>
                      <td>{enrollment.course.credits}</td>
                    </tr>
                  )) :
                  <tr><td colSpan="3">No Courses Registered</td></tr>
                }
              </tbody>
            </table>
          </div>

          {/* RESULTS */}
          <div className="glass-card academic-card">
            <div className="card-header">
              <Award size={20}/>
              <h3>Results</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                { results.length>0 ?
                  results.map(exam=>(
                    <tr key={exam.id}>
                      <td>{exam.course.courseName}</td>
                      <td>{exam.marks}</td>
                      <td><span className="grade-badge">{exam.grade}</span></td>
                    </tr>
                  )) :
                  <tr><td colSpan="3">No Results</td></tr>
                }
              </tbody>
            </table>
          </div>

          {/* ATTENDANCE */}
          <div className="glass-card academic-card">
            <div className="card-header">
              <CalendarCheck size={20}/>
              <h3>Attendance</h3>
            </div>
            <div className="attendance-summary">
              <div className="attendance-ring">
                <h2 className="attendance-percentage">
                  {attendanceStats.percentage}<span>%</span>
                </h2>
                <p>Present</p>
              </div>
              <div className="attendance-stats">
                <div className="stat-row">
                  <span>Total Classes</span>
                  <strong>{attendanceStats.total}</strong>
                </div>
                <div className="stat-row">
                  <span>Present</span>
                  <strong className="text-green">{attendanceStats.present}</strong>
                </div>
                <div className="stat-row">
                  <span>Absent</span>
                  <strong className="text-red">{attendanceStats.absent}</strong>
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