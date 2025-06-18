import { ApiClient } from "../api/api";

export const getCoursesData = () => {
    return ApiClient.get('CoursesApi/')
}

export const creategetCoursesData = (data) =>{
    return ApiClient.post('CoursesApi/',data)
}

export const updateCoursesData = (id, data) => {
    return ApiClient.put(`/CoursesApi/${id}/`, data);
};
export const deleteCoursesData = (id) => {
    return ApiClient.delete(`/CoursesApi/${id}/`);
};
