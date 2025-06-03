import axios from "axios"


const baseUrl = "http://127.0.0.1:8000/"

export const ApiClient = axios.create({
    baseUrl:baseUrl,
    headers:{
        "Content-Type":"applications/json",
         Accept:"application/json"
    }
})