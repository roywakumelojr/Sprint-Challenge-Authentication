import axios from 'axios';

export default function axiosWithAuth () {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'http://localhost:3300',
    headers: {
      Authorization: token
    }
  });
};