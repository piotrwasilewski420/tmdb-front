import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2020',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default axiosInstance;