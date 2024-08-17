import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/", // Base URL untuk permintaan API
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function untuk mendapatkan URL gambar dari categories
const getImageURL = (path) => {
  return `http://localhost:5000${path}`;
};

export default api; // Tambahkan ekspor default di sini
export { getImageURL };
