import axios from "axios";
import toast from "react-hot-toast";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL
});

// Axios Interceptor: Handles Unauthorized Errors (401)
export const setupInterceptors = (logout: (showAlert?: boolean) => void) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                logout(false);
                return null
            }
            
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
