import Axios from "axios";

const api = Axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  //   console.log(config.data);
  return config;
});

api.interceptors.response.use((response) => {
  //   console.log(response);
  return response;
});

export default api;
