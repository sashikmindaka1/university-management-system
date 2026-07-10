import axios from "axios";


const API_URL="http://localhost:8080/api/enrollments";



export const getEnrollments=async()=>{


const response = await axios.get(API_URL);


return response.data;


};




export const addEnrollment=async(enrollment)=>{


const response =
await axios.post(API_URL,enrollment);


return response.data;


};




export const deleteEnrollment=async(id)=>{


return await axios.delete(
`${API_URL}/${id}`
);


};