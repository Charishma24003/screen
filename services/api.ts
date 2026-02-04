import axios from 'axios';

const api = axios.create({
    timeout: 5000, // 5 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
