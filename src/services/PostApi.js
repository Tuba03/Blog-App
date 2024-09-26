// services/posts-service.js

const API_BASE_URL = 'http://100.28.49.102:9090'; // Replace with your actual API base URL

export async function createPost(postDto) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/post/{postId}/updateWithMedia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if required
        // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
      },
      body: JSON.stringify(postDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to create post';

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

export async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/{userId}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if required
        // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to fetch posts';

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

export async function fetchPostById(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if required
        // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to fetch post';

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

export async function updatePost(postId, postDto) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if required
        // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
      },
      body: JSON.stringify(postDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to update post';

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

export async function deletePost(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if required
        // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to delete post';

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}
