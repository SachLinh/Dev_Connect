import axios from "axios";

const api = axios.create({
  baseURL: "https://safe-island-07845.herokuapp.com",
  timeout: 20000,
});
api.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default api;