import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, deleteStudent } from '../services/studentService';
import { Search, Plus, Trash2 } from 'lucide-react';
import './StudentManagement.css';


export default function StudentManagement() {


  const [students, setStudents] = useState([]);


  const [newStudent, setNewStudent] = useState({
    studentId: '',
    name: '',
    major: '',
    batch: ''
  });


  const [searchTerm, setSearchTerm] = useState('');



  // Load students from backend when page opens
  useEffect(() => {

    loadStudents();

  }, []);



  // GET all students from Spring Boot
  const loadStudents = async () => {

    try {

      const data = await getStudents();

      setStudents(data);

    } catch (error) {

      console.log("Error loading students:", error);

    }

  };



  // Input change handler
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setNewStudent({
      ...newStudent,
      [name]: value
    });

  };




  // ADD student to database
  const handleAddStudent = async (e) => {

    e.preventDefault();


    if (!newStudent.studentId || !newStudent.name) {

      return;

    }



    try {


      const savedStudent = await addStudent(newStudent);



      setStudents([
        ...students,
        savedStudent
      ]);



      setNewStudent({

        studentId: '',
        name: '',
        major: '',
        batch: ''

      });



    } catch(error) {


      console.log("Error adding student:", error);


    }


  };




  // DELETE student from database
  const handleDelete = async (id) => {


    try {


      await deleteStudent(id);



      setStudents(
        students.filter(
          student => student.id !== id
        )
      );



    } catch(error) {


      console.log("Delete error:", error);


    }


  };




  // Search filter
  const filteredStudents = students.filter(student =>

    student.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    student.studentId
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())

  );




  return (

    <div className="module-container">


      {/* Search Bar */}

      <div className="controls-section">

        <div className="search-bar">

          <Search 
            className="search-icon" 
            size={18} 
          />


          <input

            type="text"

            placeholder="Search by Student ID or Name..."

            value={searchTerm}

            onChange={(e)=>setSearchTerm(e.target.value)}

          />


        </div>


      </div>





      {/* Add Student Form */}

      <div className="glass-card form-card">


        <h3>
          Enroll New Student
        </h3>



        <form 
          onSubmit={handleAddStudent}
          className="add-student-form"
        >


          <input

            type="text"

            name="studentId"

            placeholder="ID (e.g., STU-001)"

            value={newStudent.studentId}

            onChange={handleInputChange}

            required

          />



          <input

            type="text"

            name="name"

            placeholder="Full Name"

            value={newStudent.name}

            onChange={handleInputChange}

            required

          />



          <input

            type="text"

            name="major"

            placeholder="Major / Program"

            value={newStudent.major}

            onChange={handleInputChange}

            required

          />



          <input

            type="text"

            name="batch"

            placeholder="Batch Year"

            value={newStudent.batch}

            onChange={handleInputChange}

            required

          />




          <button 
            type="submit" 
            className="action-btn add-btn"
          >

            <Plus size={18} />

            Add Record

          </button>



        </form>


      </div>







      {/* Student Table */}


      <div className="glass-card table-card">


        <div className="table-responsive">


          <table className="data-table">


            <thead>


              <tr>

                <th>Student ID</th>

                <th>Name</th>

                <th>Major</th>

                <th>Batch</th>

                <th>Status</th>

                <th>Actions</th>


              </tr>


            </thead>




            <tbody>



            {filteredStudents.length > 0 ? (


              filteredStudents.map((student)=>(


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
                    {student.batch}
                  </td>



                  <td>

                    <span className="status-badge active">

                      {student.status || "Active"}

                    </span>

                  </td>



                  <td>


                    <button

                      className="icon-btn delete-btn"

                      onClick={()=>handleDelete(student.id)}

                    >

                      <Trash2 size={18}/>


                    </button>


                  </td>



                </tr>



              ))



            ) : (



              <tr>

                <td 
                  colSpan="6" 
                  className="empty-state"
                >

                  No students found. Add a new record above.

                </td>

              </tr>


            )}



            </tbody>



          </table>



        </div>



      </div>




    </div>


  );


}