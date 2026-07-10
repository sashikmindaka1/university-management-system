import axios from "axios";


const API="http://localhost:8080/api";


export const getStudent=(id)=>
axios.get(`${API}/students/${id}`)
.then(res=>res.data);



export const getStudentCourses=(id)=>
axios.get(`${API}/enrollments/student/${id}`)
.then(res=>res.data);



export const getStudentResults=(id)=>
axios.get(`${API}/exams/student/${id}`)
.then(res=>res.data);



export const getStudentAttendance=(id)=>
axios.get(`${API}/attendance/student/${id}`)
.then(res=>res.data);