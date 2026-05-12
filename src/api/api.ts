import axios from 'axios';

const api = axios.create({
    baseURL:'https://expense-tracker-pufo.onrender.com/',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
})
export default api;