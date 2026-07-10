import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {
User,
Lock,
ShieldCheck
} from "lucide-react";

import "./Login.css";



export default function Login(){


const navigate = useNavigate();


const [role,setRole] = useState("Admin");



const handleLogin = (e)=>{

e.preventDefault();


localStorage.setItem(
"active_session_role",
role
);


// demo users
const user = {

id:1,

role:role

};


localStorage.setItem(
"active_user",
JSON.stringify(user)
);



if(role==="Admin"){


navigate("/dashboard");


}


else if(role==="Student"){


navigate("/student-portal");


}


else if(role==="Employee"){


navigate("/employee-portal");


}



};



return(


<div className="login-container">


<div className="login-glass-panel">



<div className="login-header">

<h2>
Welcome
</h2>

<p>
Please login to your account
</p>

</div>





<form 
className="login-form"
onSubmit={handleLogin}
>




<div className="input-group">

<ShieldCheck 
className="input-icon"
/>


<select

className="role-selector"

value={role}

onChange={(e)=>setRole(e.target.value)}

>


<option value="Admin">
System Administrator
</option>


<option value="Student">
Undergraduate Student
</option>


<option value="Employee">
Lecturer / Staff
</option>


</select>


</div>







<div className="input-group">


<User className="input-icon"/>


<input

type="text"

placeholder="Username or ID"

required

/>


</div>





<div className="input-group">


<Lock className="input-icon"/>


<input

type="password"

placeholder="Password"

required

/>


</div>





<button

className="login-btn"

type="submit"

>


LOGIN AS {role.toUpperCase()}


</button>




</form>



</div>


</div>


);


}