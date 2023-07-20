import axios from 'axios';

const Authapi = axios.create({
  baseURL: 'http://localhost:9009/api/user'
});

export default Authapi;