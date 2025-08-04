// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://govt-project-backend-1.onrender.com',
});

export default api;