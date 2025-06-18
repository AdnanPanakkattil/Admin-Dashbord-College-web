import { ApiClient } from "../api/api";

export const getCollegeData = () => {
    return ApiClient.get('/CollegeApi/'); 
};

export const createCollegeData = (data) => {
    return ApiClient.post('/CollegeApi/', data);
};

export const updateCollegeData = (id, data) => {
    return ApiClient.put(`/CollegeApi/${id}/`, data);
};
export const deleteCollegeData = (id) => {
    return ApiClient.delete(`/CollegeApi/${id}/`);
};
