import axios from "axios";


const API_URL =
(process.env.REACT_APP_API_URL || "http://localhost:8080/api") + "/lecturers";




// Get all lecturers

export const getLecturers = async()=>{


    const response =
    await axios.get(API_URL);


    return response.data;


};





// Get one lecturer

export const getLecturerById = async(id)=>{


    const response =
    await axios.get(
        `${API_URL}/${id}`
    );


    return response.data;


};






// Add lecturer

export const addLecturer = async(data)=>{


    const response =
    await axios.post(
        API_URL,
        data
    );


    return response.data;


};