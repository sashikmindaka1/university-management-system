import React, { useEffect, useState } from "react";

import {
    Users,
    BookOpen,
    Briefcase,
    GraduationCap,
    Activity,
    Server
} from "lucide-react";


import {
    getStudents
} from "../services/studentService";


import {
    getCourses
} from "../services/courseService";


import {
    getEmployees
} from "../services/employeeService";


import {
    getEnrollments
} from "../services/enrollmentService";


import "./Overview.css";



export default function Overview(){



const [stats,setStats]=useState({

students:0,

courses:0,

employees:0,

enrollments:0

});






useEffect(()=>{


loadStats();


},[]);






const loadStats=async()=>{


try{


const students =
await getStudents();


const courses =
await getCourses();



const employees =
await getEmployees();



const enrollments =
await getEnrollments();





setStats({


students:students.length,


courses:courses.length,


employees:employees.length,


enrollments:enrollments.length



});



}catch(error){


console.log(
"Overview Load Error",
error
);


}



};









return(


<div className="module-container overview-container">





{/* SYSTEM STATUS */}


<div className="glass-card system-health-card">



<div className="health-indicator">


<div className="pulse-dot"></div>


<span className="health-text">

System Status: All Services Operational

</span>



</div>





<div className="server-info">


<Server size={16}/>


<span>

Spring Boot + PostgreSQL Environment

</span>


</div>



</div>











{/* STATS */}



<div className="stats-grid">






<div className="glass-card stat-card">


<div className="stat-icon-wrapper blue">


<Users size={24}/>


</div>



<div className="stat-details">


<h4>

Total Students

</h4>


<h2>

{stats.students}

</h2>


</div>


</div>









<div className="glass-card stat-card">


<div className="stat-icon-wrapper purple">


<BookOpen size={24}/>


</div>



<div className="stat-details">


<h4>

Active Courses

</h4>


<h2>

{stats.courses}

</h2>


</div>


</div>











<div className="glass-card stat-card">


<div className="stat-icon-wrapper green">


<GraduationCap size={24}/>


</div>



<div className="stat-details">


<h4>

Course Enrollments

</h4>


<h2>

{stats.enrollments}

</h2>


</div>


</div>









<div className="glass-card stat-card">


<div className="stat-icon-wrapper orange">


<Briefcase size={24}/>


</div>



<div className="stat-details">


<h4>

Registered Staff

</h4>


<h2>

{stats.employees}

</h2>


</div>


</div>





</div>









{/* ACTIVITY */}



<div className="glass-card activity-card">



<div className="card-header">


<Activity size={20}/>


<h3>

System Audit Log

</h3>


</div>






<div className="activity-list">





<div className="activity-item">


<div className="activity-bullet blue"></div>


<p>

Admin accessed Dashboard

</p>


<span>

Live Database

</span>


</div>








<div className="activity-item">


<div className="activity-bullet green"></div>


<p>

PostgreSQL synchronization completed

</p>


<span>

Running

</span>


</div>








<div className="activity-item">


<div className="activity-bullet purple"></div>


<p>

Spring Boot API Connected

</p>


<span>

Online

</span>


</div>





</div>





</div>








</div>


);


}