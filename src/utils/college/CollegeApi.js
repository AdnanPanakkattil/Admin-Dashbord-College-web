import { ApiClient } from "../api/api"

export const getCollegeData = () => {
    return ApiClient.get('CollegeApi/')

}

export const creategetCollegeData = (data)=>{
    return ApiClient.post('CollegeApi/',data)
}