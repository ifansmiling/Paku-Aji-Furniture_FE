import axios from "axios";
import { useNavigate } from "react-router-dom";

// Membuat instance Axios
const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function untuk mendapatkan URL gambar
const getImageURL = (path) => {
  return `http://localhost:5000${path}`;
};

// Menambahkan interceptor untuk menyertakan token di setiap permintaan
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
export { getImageURL };
