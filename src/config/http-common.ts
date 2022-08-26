import axios from 'axios';

let BASE_URL = 'http://localhost:3500';

if (process.env.NODE_ENV === 'development') {
  BASE_URL = `${process.env.REACT_APP_BASE_URL_DEV}`;
}

if (process.env.NODE_ENV === 'production') {
  BASE_URL = `${process.env.REACT_APP_BASE_URL_PROD}`;
}

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});
