import axios, { GenericAbortSignal } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
    return cookies.get("accessToken");
};

const getHeaders = () => {
    return {
        Authorization: `Bearer ${getToken()}`
    };
};

export const protectedApi = {
    GET: async (url: string, params?: any, signal? : GenericAbortSignal) => {
        try {
            const headers = getHeaders();
            const response = await axios.get(`${baseURL}${url}`, { headers, params, signal });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    POST: async (url: string, body?: any) => {
        try {
            const headers = getHeaders();
            const response = await axios.post(`${baseURL}${url}`, body, { headers });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
