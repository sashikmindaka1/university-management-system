import axios from "axios";


const API_URL = "http://localhost:8080/api/courses";


// Get all courses
export const getCourses = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};



// Add course
export const addCourse = async (course) => {

    const response = await axios.post(API_URL, course);

    return response.data;

};



// Delete course
export const deleteCourse = async (id) => {

    const response = await axios.delete(`${API_URL}/${id}`);

    return response.data;

};