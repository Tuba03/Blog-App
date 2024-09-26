
// // eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiaWxhbGFpamF6a2hhb…BOgzq_gcrTKhAu_0vr3XARLTROFlZhcVew4YOCOBm6JJr3vtg   bilal
// // eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmNAMTIzLmNvbSIsI…-W6SQ4dYJrXxeW3KDdkkNUZGp2Ed6HtsVTrUhkwC8MO26pC4g    abc@123.com
// // services/Category-Service.js

// import { myAxios } from './Helper';

// export const loadAllCategories = async () => {
//     try {
//         const response = await myAxios.get('/api/categories/');
//         return response.data;
//     } catch (error) {
//         console.error('Failed to load categories:', error);
//         throw error;
//     }
// };


// export const createPost = async (postDto) => {
//     try {
//         // const token = localStorage.getItem('authToken');
//         const response = await myAxios.post('/api/user/{userId}/category/{categoryId}/posts/with-media', postDto, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error creating post:', error);
//         throw error;
//     }
// };

import { myAxios } from './Helper';

const token = localStorage.getItem('authToken');
console.log('Token:', token);

// Load categories function
export const loadAllCategories = async (setCategories, setError) => {
    try {
        const response = await myAxios.get('/api/categories/');
        setCategories(response.data);
    } catch (error) {
        console.error('Failed to load categories:', error.message || error);
        setError('Failed to load categories. Please try again later.');
    }
};



export const createCategory = async (categoryDto) => {
    try {
        const response = await myAxios.post('/api/categories/', categoryDto);
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error.message || error);
        throw error;
    }
};


export const getCategoryById = async (catId) => {
    try {
        const response = await myAxios.get(`/api/categories/${catId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error.message || error);
        throw error;
    }
};


export const updateCategory = async (catId, categoryDto) => {
    try {
        const response = await myAxios.put(`/api/categories/${catId}`, categoryDto);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error.message || error);
        throw error;
    }
};

export const deleteCategory = async (catId) => {
    try {
        const response = await myAxios.delete(`/api/categories/${catId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error.message || error);
        throw error;
    }
};


export const searchCategories = async (keyword) => {
    try {
        const response = await myAxios.get(`/api/categories/search/${keyword}`);
        return response.data;
    } catch (error) {
        console.error('Error searching categories:', error.message || error);
        throw error;
    }
};



export const createPost = async (postDto) => {
    try {
        const response = await myAxios.post(`/api/user/${postDto.userId}/category/${postDto.categoryId}/posts/with-media`, postDto, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error.response ? error.response.data : error.message);
        throw error;
    }
};
