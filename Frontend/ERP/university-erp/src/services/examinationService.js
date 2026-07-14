import axios from "axios";


const API = (process.env.REACT_APP_API_URL || "http://localhost:8080/api") + "/exams";



export const getExaminations = async()=>{

const res = await axios.get(API);

return res.data;

};



export const addExamination = async(data)=>{

const res = await axios.post(
API + "/add-result",
data
);

return res.data;

};