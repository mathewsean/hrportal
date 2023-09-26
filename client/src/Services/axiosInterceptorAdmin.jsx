import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", 
})

instance.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken');
    
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default instance