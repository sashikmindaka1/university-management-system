import React, { useEffect, useState } from "react";
import { Plus, Trash2, Search } from "lucide-react";

import {
    getCourses,
    addCourse,
    deleteCourse
} from "../services/courseService";

import {
    getStudents
} from "../services/studentService";

import {
    addEnrollment,
    getEnrollments,
    deleteEnrollment
} from "../services/enrollmentService";

import "./CourseRegistration.css";


export default function CourseRegistration(){


const [courses,setCourses] = useState([]);

const [students,setStudents] = useState([]);

const [enrollments,setEnrollments] = useState([]);



const [newCourse,setNewCourse] = useState({

    courseCode:"",
    courseName:"",
    credits:""

});



const [newEnrollment,setNewEnrollment] = useState({

    studentId:"",
    courseId:"",
    semester:"",
    year:""

});


const [searchTerm,setSearchTerm] = useState("");




// LOAD DATA

useEffect(()=>{

    loadCourses();
    loadStudents();
    loadEnrollments();

},[]);




// GET COURSES

const loadCourses = async()=>{

try{

const data = await getCourses();

setCourses(
    Array.isArray(data) ? data : []
);


}catch(error){

console.log("Course load error",error);

}

};




// GET STUDENTS

const loadStudents = async()=>{

try{

const data = await getStudents();


setStudents(
    Array.isArray(data) ? data : []
);


}catch(error){

console.log("Student load error",error);

}

};




// GET ENROLLMENTS

const loadEnrollments = async()=>{

try{

const data = await getEnrollments();


setEnrollments(
    Array.isArray(data) ? data : []
);


}catch(error){

console.log("Enrollment load error",error);

}

};





// COURSE INPUT

const handleCourseChange=(e)=>{

setNewCourse({

...newCourse,

[e.target.name]:e.target.value

});

};






// ADD COURSE

const handleAddCourse=async(e)=>{

e.preventDefault();


try{


const course={

courseCode:newCourse.courseCode,

courseName:newCourse.courseName,

credits:Number(newCourse.credits)

};



const saved = await addCourse(course);



setCourses([

...courses,

saved

]);



setNewCourse({

courseCode:"",
courseName:"",
credits:""

});



}catch(error){

console.log(error);

}


};






// DELETE COURSE

const handleDeleteCourse=async(id)=>{


try{


await deleteCourse(id);


setCourses(

courses.filter(
course=>course.id!==id
)

);



}catch(error){

console.log(error);

}


};







// ENROLLMENT INPUT

const handleEnrollmentChange=(e)=>{


setNewEnrollment({

...newEnrollment,

[e.target.name]:e.target.value

});


};







// ADD ENROLLMENT

const handleAddEnrollment=async(e)=>{


e.preventDefault();


try{


const enrollment={


student:{

id:Number(newEnrollment.studentId)

},


course:{

id:Number(newEnrollment.courseId)

},


semester:newEnrollment.semester,


year:newEnrollment.year


};




const saved = await addEnrollment(enrollment);



setEnrollments([

...enrollments,

saved

]);



setNewEnrollment({

studentId:"",
courseId:"",
semester:"",
year:""

});



}catch(error){

console.log("Enrollment error",error);

}


};







// DELETE ENROLLMENT

const handleDeleteEnrollment=async(id)=>{


try{


await deleteEnrollment(id);


setEnrollments(

enrollments.filter(
e=>e.id!==id
)

);


}catch(error){

console.log(error);

}


};







const filteredCourses = courses.filter(course=>

course.courseName
?.toLowerCase()
.includes(searchTerm.toLowerCase())

||

course.courseCode
?.toLowerCase()
.includes(searchTerm.toLowerCase())

);







return(


<div className="module-container">





<div className="controls-section">

<div className="search-bar">

<Search size={18}/>


<input

placeholder="Search Course..."

value={searchTerm}

onChange={(e)=>setSearchTerm(e.target.value)}

/>


</div>

</div>






{/* ADD COURSE */}


<div className="glass-card form-card">


<h3>
Register New Course
</h3>



<form onSubmit={handleAddCourse}>


<input

name="courseCode"

placeholder="Course Code"

value={newCourse.courseCode}

onChange={handleCourseChange}

required

/>




<input

name="courseName"

placeholder="Course Name"

value={newCourse.courseName}

onChange={handleCourseChange}

required

/>




<input

type="number"

name="credits"

placeholder="Credits"

value={newCourse.credits}

onChange={handleCourseChange}

required

/>




<button className="action-btn add-btn">

<Plus size={18}/>

Add Course

</button>



</form>


</div>









{/* COURSE LIST */}


<div className="glass-card table-card">


<h3>
Courses
</h3>


<table className="data-table">


<thead>

<tr>

<th>Code</th>

<th>Name</th>

<th>Credits</th>

<th>Action</th>

</tr>

</thead>



<tbody>


{

filteredCourses.map(course=>(


<tr key={course.id}>


<td>
{course.courseCode}
</td>


<td>
{course.courseName}
</td>


<td>
{course.credits}
</td>



<td>


<button

className="icon-btn delete-btn"

onClick={()=>handleDeleteCourse(course.id)}

>

<Trash2 size={18}/>


</button>


</td>



</tr>


))


}


</tbody>


</table>


</div>









{/* ENROLL STUDENT */}



<div className="glass-card form-card">


<h3>
Register Student To Course
</h3>



<form onSubmit={handleAddEnrollment}>


<select

name="studentId"

value={newEnrollment.studentId}

onChange={handleEnrollmentChange}

required

>


<option value="">
Select Student
</option>



{

students.map(student=>(


<option

key={student.id}

value={student.id}

>


{student.studentId} - {student.name}


</option>


))


}



</select>






<select

name="courseId"

value={newEnrollment.courseId}

onChange={handleEnrollmentChange}

required

>


<option value="">
Select Course
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

name="semester"

placeholder="Semester"

value={newEnrollment.semester}

onChange={handleEnrollmentChange}

required

/>




<input

name="year"

placeholder="Year"

value={newEnrollment.year}

onChange={handleEnrollmentChange}

required

/>




<button className="action-btn add-btn">

<Plus size={18}/>

Register Student

</button>



</form>


</div>










{/* ENROLLMENT LIST */}



<div className="glass-card table-card">


<h3>
Registered Courses
</h3>



<table className="data-table">


<thead>


<tr>

<th>Student</th>

<th>Course</th>

<th>Semester</th>

<th>Year</th>

<th>Action</th>

</tr>


</thead>




<tbody>


{


enrollments.length > 0 ?


enrollments.map(enroll=>(


<tr key={enroll.id}>


<td>

{enroll.student?.studentId}
-
{enroll.student?.name}

</td>



<td>

{enroll.course?.courseCode}
-
{enroll.course?.courseName}

</td>



<td>

{enroll.semester}

</td>


<td>

{enroll.year}

</td>



<td>


<button

className="icon-btn delete-btn"

onClick={()=>handleDeleteEnrollment(enroll.id)}

>


<Trash2 size={18}/>


</button>


</td>


</tr>


))


:


<tr>

<td colSpan="5">

No Enrollment Found

</td>

</tr>


}



</tbody>


</table>



</div>





</div>


);


}