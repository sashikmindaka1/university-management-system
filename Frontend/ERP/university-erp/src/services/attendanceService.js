import axios from "axios";


const API = (process.env.REACT_APP_API_URL || "http://localhost:8080/api") + "/attendance";



// Get all attendance

export const getAttendance = async()=>{

    const response = await axios.get(API);

    return response.data;

};




// Save attendance

export const saveAttendance = async(data)=>{


    const response = await axios.post(
        API,
        data
    );


    return response.data;

};



// Get by date

export const getAttendanceByDate = async(date)=>{


    const response = await axios.get(
        `${API}/date/${date}`
    );


    return response.data;


};