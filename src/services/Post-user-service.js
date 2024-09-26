import axiosInstance from './axiosConfig'; 

// Fetch user details by ID
export const getUserById = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Update user details by ID
export const updateUserById = async (userId, userData) => {
    try {
        const response = await axiosInstance.put(`/api/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Delete user by ID
export const deleteUserById = async (userId) => {
    try {
        await axiosInstance.delete(`/api/users/${userId}`);
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Update user preferences
export const updateUserPreferences = async (userId, preferences) => {
    try {
        const response = await axiosInstance.put('/api/users/update-preference', { userId, preferences });
        return response.data;
    } catch (error) {
        console.error('Error updating preferences:', error);
        throw error;
    }
};

// Update user password
export const updateUserPassword = async (userId, newPassword) => {
    try {
        const response = await axiosInstance.put('/api/users/update-password', { userId, newPassword });
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

// Get user profile picture
export const getUserProfilePic = async (imageName) => {
    try {
        const response = await axiosInstance.get(`/api/users/profilepic/image/${imageName}`, {
            responseType: 'arraybuffer' // Adjust if expecting image data
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        throw error;
    }
};

// Fetch list of all users
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/users/');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
