import axios from "axios";

const api = axios.create({
  baseURL: "https://wantace-roof-estimator-f3qg.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
