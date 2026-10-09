import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your API base URL

export const fetchData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
};

export const postData = async (endpoint: string, data: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting data: ${error}`);
    }
};

// Add more API functions as needed