// src/services/apiService.js

const API_BASE_URL = 'http://127.0.0.1:8000';

const checkResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Something went wrong.');
  }
  return response.json();
};

// Authentication Endpoints

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(response);
};

export const signupUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(response);
};

// Profile Endpoints

export const getProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

// Blog Endpoints

export const createBlog = async (title, content, token) => {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  return checkResponse(response);
};

export const getAllBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'GET',
  });
  return checkResponse(response);
};

export const getMyBlogs = async (token) => {
  const response = await fetch(`${API_BASE_URL}/blogs/my`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return checkResponse(response);
};

// Add these to src/services/apiService.js

export const updateProfile = async (token, name, profilePhoto) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, profile_photo_url: profilePhoto }),
    });
    return checkResponse(response);
};

export const followUser = async (userId, token) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/follow`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return checkResponse(response);
};