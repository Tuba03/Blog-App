import axios from 'axios';

const API_BASE_URL = 'http://100.28.49.102:9090';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Add more default headers here if needed, such as Authorization
    }
});

export default axiosInstance;
