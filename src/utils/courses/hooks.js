import { useMutation } from "react-query"
import { creategetCoursesData, deleteCoursesData, getCoursesData, updateCoursesData } from "./CoursesApi/";


export const useGetCourses = () => {
    return useQuery('getCollege', getCoursesData);
};

export const useCreateCourses= () => {
    return useMutation(creategetCoursesData);
};


export const useUpdateCourses= () => {
    return useMutation(({ id, data }) => updateCoursesData(id, data));
};

export const useDeleteCourses= () => {
    return useMutation(deleteCoursesData);
};
