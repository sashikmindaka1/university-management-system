import React, { useEffect, useState } from "react";
import { FileText, Save, CheckCircle } from "lucide-react";

import { getCourses } from "../services/courseService";
import { getStudents } from "../services/studentService";
import { getEnrollments } from "../services/enrollmentService";

import {
    getExaminations,
    addExamination
} from "../services/examinationService";


import "./ExaminationManagement.css";


export default function ExaminationManagement(){


const [courses,setCourses] = useState([]);

const [students,setStudents] = useState([]);

const [enrollments,setEnrollments] = useState([]);

const [examinations,setExaminations] = useState([]);


const [selectedCourseId,setSelectedCourseId] = useState("");

const [examCode,setExamCode] = useState("MID-01");


const [grades,setGrades] = useState({});





// LOAD ALL DATA

useEffect(()=>{

    loadData();

},[]);





const loadData = async()=>{


try{


const courseData = await getCourses();

const studentData = await getStudents();

const enrollmentData = await getEnrollments();

const examData = await getExaminations();



setCourses(courseData);

setStudents(studentData);

setEnrollments(enrollmentData);

setExaminations(examData);



// Load saved results into frontend

const savedGrades={};



examData.forEach(exam=>{


savedGrades[exam.student.id]={


marks:exam.marks,

grade:exam.grade,

status:"Published",

examId:exam.id


};


});



setGrades(savedGrades);



}catch(error){

console.log("Load Error",error);

}


};








// STUDENTS WHO SELECTED COURSE

const enrolledStudents = enrollments

.filter(enrollment =>

String(enrollment.course.id) === String(selectedCourseId)

)

.map(enrollment=>{


return {

id: enrollment.student.id,

studentId: enrollment.student.studentId,

name: enrollment.student.name,

major: enrollment.student.major

};


});









// CALCULATE GRADE

const calculateGrade=(marks)=>{


if(marks==="") return "-";


let m=Number(marks);



if(m>=80)
return "A";


if(m>=65)
return "B";


if(m>=55)
return "C";


if(m>=35)
return "S";


return "F";


};









// MARK CHANGE

const handleMarksChange=(studentId,value)=>{


let mark=value;


if(mark>100)
mark=100;


if(mark<0)
mark=0;



setGrades(prev=>({


...prev,


[studentId]:{


marks:mark,

grade:calculateGrade(mark),

status:"Draft"


}



}));


};









// SAVE RESULTS

const handlePublishResults = async()=>{


try{


for(let student of enrolledStudents){



const result = grades[student.id];



if(result){



const exam={


examCode:examCode,


marks:String(result.marks),


grade:result.grade,



student:{


id:student.id


},



course:{


id:Number(selectedCourseId)


}



};





await addExamination(exam);



}



}





alert("Examination Results Saved Successfully");



// reload database values

loadData();



}catch(error){


console.log("Save Error",error);


}



};









return(


<div className="module-container">






{/* COURSE SELECT */}



<div className="controls-section grading-controls">



<div className="glass-card selection-card">



<FileText size={20}/>



<select

className="course-selector"

value={selectedCourseId}

onChange={(e)=>setSelectedCourseId(e.target.value)}

>



<option value="">

-- Select Course --

</option>



{

courses.map(course=>(


<option

key={course.id}

value={course.id}

>


{course.courseCode} - {course.courseName}


</option>



))

}



</select>





<input

className="exam-input"

value={examCode}

onChange={(e)=>setExamCode(e.target.value)}

placeholder="Exam Code"

/>



</div>







{

selectedCourseId && enrolledStudents.length>0 &&


<button

className="action-btn publish-btn"

onClick={handlePublishResults}

>


<Save size={18}/>


Save Results


</button>



}



</div>









{/* TABLE */}



<div className="glass-card table-card">



<h3>

Examination Grading Sheet

</h3>





<table className="data-table">


<thead>


<tr>


<th>Student ID</th>

<th>Name</th>

<th>Major</th>

<th>Marks</th>

<th>Grade</th>

<th>Status</th>


</tr>


</thead>






<tbody>



{

!selectedCourseId ?


<tr>

<td colSpan="6">

Select Course First

</td>

</tr>



:


enrolledStudents.length===0 ?


<tr>

<td colSpan="6">

No Students Registered

</td>

</tr>



:



enrolledStudents.map(student=>{


const record = grades[student.id] || {


marks:"",

grade:"-",

status:"Pending"


};





return(



<tr key={student.id}>



<td>

<strong>

{student.studentId}

</strong>

</td>




<td>

{student.name}

</td>




<td>

{student.major}

</td>





<td>


<input


type="number"

className="marks-input"


value={record.marks}


onChange={(e)=>

handleMarksChange(

student.id,

e.target.value

)

}


/>



</td>







<td>


<span className="grade-badge">


{record.grade}


</span>


</td>







<td>


<span className="status-badge">


{

record.status==="Published"

&&

<CheckCircle size={12}/>


}


{record.status}



</span>



</td>





</tr>



)


})


}



</tbody>



</table>



</div>







</div>


);



}