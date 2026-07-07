import axios from 'axios'
import { message } from 'antd';
//import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL; 

export const handleLogin = async (
    values: {username: string; password: string},
    navigate: (path:string) => void,
    setUserId: (id: string) => void // Pass setUserId as an argument
) => {
    
    try{
        //const response = await axios.post("http://127.0.0.1:5000/auth/login", values);
        const response = await axios.post(`${API_URL}/auth/login`, values);
        message.success(response.data.message);
        setUserId(response.data.user); // ✅ Save userId in global state
        localStorage.setItem("user", response.data.user);

        navigate("/home");
    } catch(error){
        message.error("Invalid credentials");
    }
};

