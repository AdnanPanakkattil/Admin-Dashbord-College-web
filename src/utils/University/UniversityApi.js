import { ApiClient } from "../api/api";


export const getUniversityData = () => {
    return ApiClient.get('/UniversityApi/'); 
};

export const createUniversityData = (data) => {
    return ApiClient.post('/UniversityApi/', data,{
        headers:{
            "Content-Type":"multipart/formData"
        }
    });
};

export const updateUniversityData = (id, data) => {
    return ApiClient.put(`/UniversityApi/${id}/`, data,{
        headers:{
            "Content-Type":"multipart/formData"
        }
    }

    );
};
export const deleteUniversityData = (id) => {
    return ApiClient.delete(`/UniversityApi/${id}/`);
};