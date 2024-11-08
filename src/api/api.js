import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `${token}`;
        }
        console.log(config);
        return config;
    },
    (error) => Promise.reject(error)
);


export default api;