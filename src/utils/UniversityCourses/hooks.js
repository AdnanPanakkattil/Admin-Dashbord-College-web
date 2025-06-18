import { useMutation } from "react-query"
import { getUniversityCoursesData, updateUniversityCoursesData, deleteUniversityCoursesData, CreateUniversityCoursesData } from "./UniversityCoursesApi";

export const useGetUniversityCourses = () => {
    return useQuery('getUniversityCourses', getUniversityCoursesData);
};

export const useCreateUniversityCourses= () => {
    return useMutation(CreateUniversityCoursesData);
};


export const useUpdateUniversityCourses= () => {
    return useMutation(({ id, data }) => updateUniversityCoursesData(id, data));
};

export const useDeleteUniversityCourses= () => {
    return useMutation(deleteUniversityCoursesData);
};
