import React, { useState, useEffect } from 'react';
import { Briefcase, UserPlus, Trash2, Search } from 'lucide-react';
import { getEmployees, addEmployee, deleteEmployee } from '../services/employeeService';
import './EmployeeManagement.css';

export default function EmployeeManagement() {


  const [employees, setEmployees] = useState([]);


  const [newEmployee, setNewEmployee] = useState({
    empId: '',
    name: '',
    department: '',
    role: ''
  });


  const [searchTerm, setSearchTerm] = useState('');



  // Load employees from backend
  useEffect(() => {

    loadEmployees();

  }, []);



  const loadEmployees = async () => {

    try {

      const data = await getEmployees();

      setEmployees(data);

    } catch(error) {

      console.log("Error loading employees", error);

    }

  };



  // Input change
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setNewEmployee({
      ...newEmployee,
      [name]: value
    });

  };




  // Add employee
  const handleAddEmployee = async (e) => {

    e.preventDefault();


    try {


      const employee = {

        employeeId: newEmployee.empId,
        name: newEmployee.name,
        department: newEmployee.department,
        designation: newEmployee.role

      };



      const savedEmployee = await addEmployee(employee);



      setEmployees([
        ...employees,
        savedEmployee
      ]);



      setNewEmployee({

        empId:'',
        name:'',
        department:'',
        role:''

      });



    } catch(error) {


      console.log("Error adding employee", error);


    }

  };




  // Delete employee
  const handleDelete = async(id)=>{


    try{


      await deleteEmployee(id);



      setEmployees(
        employees.filter(emp => emp.id !== id)
      );


    }catch(error){


      console.log("Delete error",error);


    }


  };





  // Search
  const filteredEmployees = employees.filter(emp =>

    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||

    emp.department.toLowerCase().includes(searchTerm.toLowerCase())

  );




  return (

    <div className="module-container">



      <div className="controls-section">

        <div className="search-bar">

          <Search className="search-icon" size={18}/>


          <input

            type="text"

            placeholder="Search by ID, Name, or Department..."

            value={searchTerm}

            onChange={(e)=>setSearchTerm(e.target.value)}

          />


        </div>

      </div>





      <div className="glass-card form-card">


        <div className="card-header">

          <UserPlus size={20}/>

          <h3>Register New Staff Member</h3>


        </div>




        <form 
          onSubmit={handleAddEmployee}
          className="add-employee-form"
        >



          <input

            type="text"

            name="empId"

            placeholder="Staff ID (EMP-001)"

            value={newEmployee.empId}

            onChange={handleInputChange}

            required

          />



          <input

            type="text"

            name="name"

            placeholder="Full Name"

            value={newEmployee.name}

            onChange={handleInputChange}

            required

          />





          <select

            name="department"

            value={newEmployee.department}

            onChange={handleInputChange}

            required

          >

            <option value="">-- Select Department --</option>

            <option value="Computer Science">
              Computer Science
            </option>

            <option value="Software Engineering">
              Software Engineering
            </option>

            <option value="Information Technology">
              Information Technology
            </option>

            <option value="Administration">
              Administration
            </option>

            <option value="Finance">
              Finance
            </option>


          </select>





          <input

            type="text"

            name="role"

            placeholder="Role / Designation"

            value={newEmployee.role}

            onChange={handleInputChange}

            required

          />





          <button 
            type="submit"
            className="action-btn add-btn"
          >

            <Briefcase size={18}/>

            Add Record


          </button>




        </form>


      </div>





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


            {

              filteredEmployees.length > 0 ?


              filteredEmployees.map((emp)=>(


                <tr key={emp.id}>


                  <td>
                    <strong>
                      {emp.employeeId}
                    </strong>
                  </td>


                  <td>
                    {emp.name}
                  </td>


                  <td>
                    {emp.department}
                  </td>


                  <td>
                    {emp.designation}
                  </td>



                  <td>


                    <button

                      className="icon-btn delete-btn"

                      onClick={()=>handleDelete(emp.id)}

                    >

                      <Trash2 size={18}/>


                    </button>



                  </td>



                </tr>


              ))



              :


              <tr>

                <td colSpan="5" className="empty-state">

                  No employee records found.

                </td>

              </tr>


            }



            </tbody>



          </table>



        </div>



      </div>




    </div>


  );

}