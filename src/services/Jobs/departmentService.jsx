
import axios from 'axios';

const API_BASE_URL = 'https://1a9a0cdf7ba0.ngrok-free.app/api/v1/departments';

export const fetchDepartments=async ()=>{
    try{
        const response = await axios.get(API_BASE_URL);
        return response.data
 
    }
    catch(err){
        throw new Error(err.response?.data?.error || err.message)
    }
}

export const addDepartment = async (name) => {
  const res = await axios.post(API_BASE_URL, { name });
  return res.data.departments;
};
