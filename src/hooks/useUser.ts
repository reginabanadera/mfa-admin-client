import { useEffect, useState } from "react";
import { fetchUserData, fetchAll, fetchAllHRIS } from "../services/UserServices";


export const useUserData = (userId : string | null) => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        if (!userId) {
            setUserData(null);
            return;
        }


        const getUserData = async () => {
            try{
                setLoading(true);
                const data = await fetchUserData(userId);
                setUserData(data);
            }
            catch(error){
                console.error("Failed to fetch user data:", error);
            }finally{
                setLoading(false);
            }
        };

        getUserData();
    }, [userId])

    return {userData, loading}
}


export const useUsers = () => {
    const [users, setUsers] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllUsers = async () => {
        try{
            setLoading(true);
            const data = await fetchAll();
            setUsers(data);
        }
        catch(error){
            console.error("Failed to fetch users:", error);
            setError("Failed to fetch users.");
        }finally{
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchAllUsers();
    }, [])

    return {users, loading, error, refetch : fetchAllUsers}
}


export const useHRISUsers = () => {
    const [employees, setEmployees] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
    
        const fetchAllHRISUsers = async () => {
            try{
                setLoading(true);
                const data = await fetchAllHRIS();
                setEmployees(data);
            }
            catch(error){
                console.error("Failed to fetch  HRIS users:", error);
                setError("Failed to fetch HRIS users.");
            }finally{
                setLoading(false);
            }
        };

        fetchAllHRISUsers();
    }, [])

    return {employees, loading, error}
}
