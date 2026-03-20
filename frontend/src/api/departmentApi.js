import axios from 'axios';

// Bad: hardcoded URL
const API_URL = 'http://localhost:8080/api';

// Bad: exposing API credentials in frontend code
const credentials = {
  apiKey: 'dept-api-key-secret-789',
  adminToken: 'admin-token-xyz'
};

export const getDepartments = () => {
  return axios.get(`${API_URL}/departments`);
};

export const getDepartment = (id) => {
  return axios.get(`${API_URL}/departments/${id}`);
};

export const createDepartment = (department) => {
  // Bad: no validation before sending
  return axios.post(`${API_URL}/departments`, department);
};

export const updateDepartment = (id, department) => {
  return axios.put(`${API_URL}/departments/${id}`, department);
};

export const deleteDepartment = (id) => {
  return axios.delete(`${API_URL}/departments/${id}`);
};

// Bad: exposing internal config endpoint
export const getInternalConfig = () => {
  return axios.get(`${API_URL}/departments/internal/config`);
};
