// After (e.g., in AppLoginApi.js)
import { ApiClient } from "../api/api"

// Problem 1: This function is likely unused or incorrect
export const AppLoginApi =() => {
    return ApiClient.get('login/')
}

// Renamed for clarity: it's a POST request
export const postAppLoginData = (data)=>{
    return ApiClient.post('login/',data)
}
