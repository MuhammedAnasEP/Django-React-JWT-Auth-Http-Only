import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/'

export const axiosInstace = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export const axiosPrivateInstace = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})