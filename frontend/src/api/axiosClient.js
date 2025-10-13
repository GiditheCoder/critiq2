import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://critiq-backend-6v3f.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
