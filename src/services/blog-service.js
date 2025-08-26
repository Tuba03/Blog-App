import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getBlogs() {
  try {
    const response = await axios.get(`${API_URL}/blogs/`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch blogs");
  }
}

export async function createBlog(blogData) {
  try {
    const response = await axios.post(`${API_URL}/blogs/`, blogData, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to create blog");
  }
}

export async function getMyBlogs() {
  try {
    const response = await axios.get(`${API_URL}/blogs/my`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to fetch your blogs");
  }
}

export async function updateBlog(blogId, blogData) {
  try {
    const response = await axios.put(`${API_URL}/blogs/${blogId}`, blogData, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to update blog");
  }
}

export async function deleteBlog(blogId) {
  try {
    const response = await axios.delete(`${API_URL}/blogs/${blogId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to delete blog");
  }
}