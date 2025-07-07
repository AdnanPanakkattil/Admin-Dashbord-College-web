import { ApiClient } from "../api/api"

export const getUniversityCoursesData = () =>{
    return ApiClient.get('UniversityCoursesApi/')
}

export const CreateUniversityCoursesData = (data) =>{
    return ApiClient.post('UniversityCoursesApi/',data)
}

export const updateUniversityCoursesData = (id, data) => {
    return ApiClient.put(`/UniversityCoursesApi/${id}/`, data);
};
export const deleteUniversityCoursesData = (id) => {
    return ApiClient.delete(`/UniversityCoursesApi/${id}/`);
};