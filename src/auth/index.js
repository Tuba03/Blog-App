// Check if the user is logged in
export const isLoggedIn = () => {
    const userData = localStorage.getItem("data");
    const authToken = localStorage.getItem("authToken");
    return userData !== null && authToken !== null;
};

// Logout the user
export const doLogout = (next) => {
    try {
        localStorage.removeItem("data");
        localStorage.removeItem("authToken"); // Clear token
        if (typeof next === 'function') {
            next();
        } else {
            console.warn('Next function is not defined or not a function.');
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

// Get current user details
export const getCurrentUserDetail = () => {
    try {
        if (isLoggedIn()) {
            const data = JSON.parse(localStorage.getItem("data"));
            return data && data.user ? data.user : undefined;
        }
        return undefined;
    } catch (error) {
        console.error('Failed to parse user data:', error);
        return undefined;
    }
};

console.log('Auth exports:', { getCurrentUserDetail, isLoggedIn });
