import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080", //  URL  бэкенда
    withCredentials: true,
});

// Добавление интерсептора для установки токена
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;