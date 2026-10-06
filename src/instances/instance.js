import axios from "axios";


const baseURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
     withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default instance;