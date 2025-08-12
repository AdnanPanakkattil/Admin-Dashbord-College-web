import { useMutation } from "react-query"
import { postAppLoginData } from "./AppLoginApi"

export const useCreateAppLogin = () => {
    return useMutation((data)=>postAppLoginData(data))
}