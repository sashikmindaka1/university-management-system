import API from "../api/api";


export const getEmployees = async () => {

    const response = await API.get("/employees");

    return response.data;

};



export const addEmployee = async (employee) => {

    const response = await API.post(
        "/employees",
        employee
    );

    return response.data;

};



export const deleteEmployee = async (id) => {

    const response = await API.delete(
        `/employees/${id}`
    );

    return response.data;

};