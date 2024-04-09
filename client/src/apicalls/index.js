import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:"http://localhost:3000",
    headers: {
        withCredentials: true,
        method: "post",
        'Content-Type': 'application/json',
        authorization:`${localStorage.getItem("token")}`,
    }
})