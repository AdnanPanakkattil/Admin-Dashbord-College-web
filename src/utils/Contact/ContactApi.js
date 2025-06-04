import { ApiClient } from "../api/api"


export const getContactData = () => {
    return ApiClient.get('ContactApi/')
}

export const creategetContactData = (data)=>{
    return ApiClient.post('ContactApi/',data)
}