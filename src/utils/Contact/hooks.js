import { useMutation } from "react-query"
import { creategetContactData } from "./ContactApi"


export const useCreateContact = () =>{
    return useMutation((data)=>creategetContactData(data))
}