// api.js

import axios from 'axios';

const apiUrl = 'http://localhost:8000/api';

const apiCall = async (method, endpoint, data = null, options = {}) => {
  endpoint = endpoint.endsWith('/') ? endpoint : endpoint + '/';  
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  const headers = {
    ...options.headers,
    Authorization: `Token ${token}`
  };

  try {
    const response = await axios({
      method,
      url: `${apiUrl}/${endpoint}`,
      data,
      headers
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    } else {
      throw error;
    }
  }
};

export default apiCall;
