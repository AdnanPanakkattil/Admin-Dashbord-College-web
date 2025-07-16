import { ApiClient } from "../api/api";


export const getCollegeData = () => {
    return ApiClient.get('/CollegeApi/'); 
};

export const createCollegeData = (data) => {
    return ApiClient.post('/CollegeApi/', data,{
        headers:{
            "Content-Type":"multipart/formData"
        }
    });
};

export const updateCollegeData = (id, data) => {
    return ApiClient.put(`/CollegeApi/${id}/`, data,{
        headers:{
            "Content-Type":"multipart/formData"
        }
    }

    );
};
export const deleteCollegeData = (id) => {
    return ApiClient.delete(`/CollegeApi/${id}/`);
};