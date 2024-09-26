// import axios from "axios";
// export const BASE_URL='http://localhost:3000'; //we need to change this address

// export const myAxios=axios.create({
//     baseURL:BASE_URL,
// })



// import axios from "axios";
// export const API_BASE_URL="http://100.28.49.102:9090";

// export const myAxios =axios.create({
//     baseURL: API_BASE_URL,
// })


// services/Helper.js

import axios from 'axios';

// Create an instance of Axios
export const myAxios = axios.create({
    baseURL: 'http://100.28.49.102:9090', 
    timeout: 10000, // Adjust timeout as needed
    withCredentials: true, // Include credentials for cross-origin requests
});

// Request interceptor to attach the token
myAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// Response interceptor to handle token refresh
myAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        if (response && response.status === 401 && !config.__isRetryRequest) {
            // Check if the request is not a retry request
            config.__isRetryRequest = true;

            // try {
            //     // Attempt to refresh the token
            //     const refreshResponse = await axios.post('http://localhost:3000/api/refresh-token', {}, { withCredentials: true });
            //     const newToken = refreshResponse.data.token;
            //     localStorage.setItem('authToken', newToken);

            //     // Update the original request with the new token and retry
            //     config.headers['Authorization'] = `Bearer ${newToken}`;
            //     return myAxios(config);
            // } catch (refreshError) {
            //     console.error('Failed to refresh token:', refreshError);
            //     // Handle token refresh failure, e.g., redirect to login page
            //     // Redirect or clear user session as needed
            //     window.location.href = '/login';
            //     return Promise.reject(refreshError);
            // }
        }

        return Promise.reject(error);
    }
);

// export const privateAxios=axios.create({
//     baseURL:BASE_URL
//     return
// })
