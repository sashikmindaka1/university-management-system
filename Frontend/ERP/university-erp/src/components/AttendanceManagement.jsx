import React, {useEffect, useState} from "react";

import {
    Calendar as CalendarIcon,
    CheckCircle,
    XCircle
} from "lucide-react";


import {
    getStudents
} from "../services/studentService";


import {
    getAttendance,
    saveAttendance
} from "../services/attendanceService";


import "./AttendanceManagement.css";



export default function AttendanceManagement(){



const [students,setStudents]=useState([]);


const [attendance,setAttendance]=useState([]);



const [selectedDate,setSelectedDate]=useState(
new Date().toISOString().split("T")[0]
);



const [attendanceRecord,setAttendanceRecord]=useState({});






useEffect(()=>{


loadData();


},[]);







const loadData=async()=>{


try{


const studentData = await getStudents();


const attendanceData = await getAttendance();



setStudents(studentData);


setAttendance(attendanceData);



// load today's attendance


const todayRecords={};



attendanceData.forEach(item=>{


if(item.date===selectedDate){


todayRecords[item.student.id]={

status:item.status,

attendanceId:item.id

};


}



});



setAttendanceRecord(todayRecords);



}catch(error){

console.log(error);

}


};









const toggleStatus=(studentId)=>{


setAttendanceRecord(prev=>({


...prev,


[studentId]:{


status:

prev[studentId]?.status==="PRESENT"

?

"ABSENT"

:

"PRESENT"


}



}));



};









const handleSaveAttendance=async()=>{


try{


for(let student of students){



const record = attendanceRecord[student.id];



if(record){



const data={


date:selectedDate,


status:record.status,


tokenUsed:"WEB",


student:{


id:student.id


}



};



await saveAttendance(data);



}



}



alert(
"Attendance Saved Successfully"
);



loadData();



}catch(error){


console.log("Save Error",error);


}



};









return(


<div className="module-container">







<div className="controls-section attendance-controls">


<div className="date-picker-wrapper">


<CalendarIcon size={18}/>


<input


type="date"


className="date-picker"


value={selectedDate}


onChange={(e)=>
setSelectedDate(e.target.value)
}


/>


</div>






<div className="module-stats">


<span className="stat-badge">

Total Students: {students.length}

</span>


</div>



</div>









<div className="glass-card table-card">



<table className="data-table">



<thead>

<tr>

<th>Student ID</th>

<th>Name</th>

<th>Batch</th>

<th>Status</th>

<th>Action</th>


</tr>

</thead>





<tbody>



{

students.map(student=>{



const status =

attendanceRecord[student.id]?.status

||

"Pending";




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

{student.batch}

</td>





<td>


<span className={`status-badge ${status.toLowerCase()}`}>

{status}

</span>


</td>







<td>



<button


className={

status==="PRESENT"

?

"toggle-btn present active"

:

"toggle-btn present"

}



onClick={()=>toggleStatus(student.id)}


>


<CheckCircle size={16}/>

Present


</button>






<button


className={

status==="ABSENT"

?

"toggle-btn absent active"

:

"toggle-btn absent"

}



onClick={()=>toggleStatus(student.id)}



>


<XCircle size={16}/>

Absent


</button>



</td>





</tr>



)



})

}



</tbody>



</table>



</div>









{

students.length>0 &&


<div className="action-footer">


<button


className="action-btn add-btn"


onClick={handleSaveAttendance}


>


Save Daily Record


</button>



</div>


}




</div>


);



}