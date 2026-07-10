import API from "../api/api";


export const getStudents = async () => {

    const response = await API.get("/students");

    return response.data;

};


export const addStudent = async (student) => {

    const response = await API.post(
        "/students",
        student
    );

    return response.data;

};


export const getStudentById = async (id) => {

    const response = await API.get(
        `/students/${id}`
    );

    return response.data;

};


export const deleteStudent = async (id) => {

    const response = await API.delete(
        `/students/${id}`
    );

    return response.data;

};