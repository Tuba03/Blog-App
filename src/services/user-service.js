import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Signup
export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: email,
      password: password
    }, {
      headers: { 
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
    
  } catch (error) {
    const message = error.response?.data?.detail || "Signup failed";
    throw new Error(message);
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email,
      password: password
    }, {
      headers: { 
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
    
  } catch (error) {
    const message = error.response?.data?.detail || "Login failed";
    throw new Error(message);
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please login.");
    }

    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
    
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    
    const message = error.response?.data?.detail || "Failed to fetch profile";
    throw new Error(message);
  }
};