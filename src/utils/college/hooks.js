import { useMutation } from "react-query"
import { creategetCollegeData } from "./CollegeApi"

export const useCreateCollege = () =>{
    return useMutation((data)=>creategetCollegeData(data))
}