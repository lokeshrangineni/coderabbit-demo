import axios from 'axios';

// Bad: hardcoded URL and API key
const API_URL = 'http://localhost:5001/api';
const API_KEY = 'employee-secret-key-12345';

// Bad: no error handling wrapper
export const getEmployees = () => {
  return axios.get(`${API_URL}/employees`);
};

export const getEmployee = (id) => {
  // Bad: no input validation
  return axios.get(`${API_URL}/employees/${id}`);
};

export const createEmployee = (employee) => {
  // Bad: sending password in plain text
  return axios.post(`${API_URL}/employees`, employee);
};

export const updateEmployee = (id, employee) => {
  return axios.put(`${API_URL}/employees/${id}`, employee);
};

export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/employees/${id}`);
};

export const searchEmployees = (name) => {
  // Bad: no input sanitization, potential for injection
  return axios.get(`${API_URL}/employees/search?name=${name}`);
};
