import { useMutation } from "react-query"
import { createUniversityData, deleteUniversityData, getUniversityData, updateUniversityData } from "./UniversityApi";



export const useGetUniversity = () => {
    return useQuery('getUniversity', getUniversityData);

};

export const useCreateUniversity = () => {
    return useMutation(createUniversityData);
};


export const useUpdateUniversity = () => {
    return useMutation(({ id, data }) => updateUniversityData(id, data));
};

export const useDeleteUniversity = () => {
    return useMutation(deleteUniversityData);
};

