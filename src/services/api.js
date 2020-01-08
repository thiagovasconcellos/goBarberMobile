import axios from 'axios';

const api = axios.create({
  // genymotion baseURL: 'http://10.0.3.2:3000',
  // motoz3 baseURL: 'http://192.168.15.13:3000',
  baseURL: 'http://192.168.15.16:3000',
});

export default api;
