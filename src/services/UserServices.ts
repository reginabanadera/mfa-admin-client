import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserData = async (userId: string) => {
    try {
        // const storedUserId = localStorage.getItem("userId");
        // const parsedUserId = storedUserId ? JSON.parse(storedUserId) : userId;
        const response = await axios.get(`${API_URL}/auth/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};


export const fetchAll = async() => {
    try {
        const response = await axios.get(`${API_URL}/auth/user`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};


export const fetchAllHRIS = async() => {
    try {
        const response = await axios.get(`${API_URL}/auth/usersFromHRIS`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};