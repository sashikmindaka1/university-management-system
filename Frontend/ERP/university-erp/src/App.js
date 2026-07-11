import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import StudentPortal from "./components/StudentPortal";
import EmployeePortal from "./components/EmployeePortal";

import "./App.css";


function App(){


return(

<div className="App">


<Routes>



<Route
path="/"
element={<Login/>}
/>





<Route
path="/dashboard"
element={<Dashboard/>}
/>





<Route
path="/student-portal"
element={<StudentPortal/>}
/>





<Route
path="/employee-portal"
element={<EmployeePortal/>}
/>





</Routes>


</div>


);


}


export default App;