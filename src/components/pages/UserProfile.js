import React, { useState, useEffect } from 'react';
import { getUserById } from './userService'; // Adjust the path

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(userId);
                setUser(userData);
            } catch (err) {
                setError('Failed to fetch user data');
            }
        };

        fetchUser();
    }, [userId]);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            {/* Render other user details */}
        </div>
    );
};

export default UserProfile;
