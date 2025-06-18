import { useMutation } from "react-query"
import { getCollegeData, createCollegeData, updateCollegeData, deleteCollegeData } from "./CollegeApi";

export const useGetCollege = () => {
    return useQuery('getCollege', getCollegeData);
};

export const useCreateCollege= () => {
    return useMutation(createCollegeData);
};


export const useUpdateCollege= () => {
    return useMutation(({ id, data }) => updateCollegeData(id, data));
};

export const useDeleteCollege= () => {
    return useMutation(deleteCollegeData);
};
