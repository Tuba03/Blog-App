// import { myAxios } from "./Helper";

// export const signUp = (user) => {
//     return myAxios
//     .post('/api/vl/auth/register')
//     .then((response) => json())
// };
// export const loginUser=(loginDetail)=>{
//     return myAxios
//     .post('',loginDetail)
//     .then((response) => response.data))
// };



import axios from 'axios';
// const cors = require('cors');
// Define the API endpoint
const API_BASE_URL = 'http://100.28.49.102:9090';

// Function to handle user signup
export const signUp = async (userDto) => {
    try {
        const formData = new FormData();
        
        // Append the userDto object as a JSON string
        formData.append('userDto', JSON.stringify(userDto));
        
        // Append the profile picture file (if any)
        if (userDto.profilepic && userDto.profilepic !== 'null') {
            const file = await fetch(userDto.profilepic).then(r => r.blob());
            formData.append('image', file, 'profilepic.jpg');
        }
        
        // Make the POST request
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '/**'
            },
        });

        return response.data; // Return the response data from the server
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

// src/services/user-service.js
export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }

        const data = await response.json();
        if (data.token) {
            localStorage.setItem('authToken', data.token);
        } else {
            throw new Error('Login successful but no token received');
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


//  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiaWxhbGFpamF6a2hhbmFtQGdtYWlsLmNvbSIsImV4cCI6MTcyNjc0OTE5NywiaWF0IjoxNzI2NzMxMTk3fQ.u-WSpO75XUqLQybPt84LdPNGPyNQd93o06u0X4DUdtVDyLMFuCDczQef8GaLIQ8UqBQdIZ6Yo64uA8a29qyRjQ
// export const login = async (username, password) => {
//     try {
//       const response = await fetch(API_BASE_URL + '/api/v1/auth/login/', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//         credentials: 'include' // Include credentials if needed
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Network response was not ok: ${errorText}`);
//       }
  
//       const data = await response.json();
  
//       // Assuming the token is in the response
//       const token = data.token;
//       // Store the token in local storage or a state management library
//       localStorage.setItem('authToken', token);
  
//       return data;
//     } catch (error) {
//       console.error('Fetch error:', error);
//       throw error;
//     }
//   };
  
  
  
  
  


//  /api/password/forget
//   /api/password/verify-otp


// Create an instance of axios with default settings
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Include cookies with requests
});

// Function to send OTP
export const sendOtp = async (email) => {
    try {
        const response = await axiosInstance.post(
            '/api/password/forget',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error.response?.data || error.message);
        throw error;
    }
};

// Function to verify OTP
export const verifyOtp = async (email, otp) => {
    try {
        const response = await axiosInstance.post(
            '/api/password/verify-otp',
            { email, otp },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error verifying OTP:', error.response?.data || error.message);
        throw error;
    }
};




// export const handlePost = async () => {
//   const title = document.getElementById('title').value;
//   const category = document.getElementById('category').value;

//   if (!title || category === 'Select option') {
//       alert('Please fill out all fields.');
//       return;
//   }

//   try {
//       const response = await fetch(API_BASE_URL + '/api/v1/auth/login', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ title, category}),
//       });

//       if (!response.ok) {
//           throw new Error('Failed to post');
//       }

//       const data = await response.json();
//       console.log('Post created:', data);
//       alert('Post created successfully!');

//   } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while creating the post.');
//   }
// };

