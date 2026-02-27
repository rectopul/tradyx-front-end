import axios from "axios";

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
}

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const siteUrl =
    import.meta.env.VITE_APP_MODE == "production"
        ? window.Laravel.appUrl
        : import.meta.env.VITE_API_URL;

export const adminApi = axios.create({
    baseURL: siteUrl + "/api/admin" || "http://localhost:3000/api",
});

export const setupAxiosInterceptors = () => {
    adminApi.interceptors.request.use(
        (config) => {
            config.headers = config.headers || {};

            if (config.url?.includes("sanctum/csrf-cookie")) {
                config.baseURL = siteUrl;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );
};

// Configurar interceptors ao iniciar a aplicação
setupAxiosInterceptors();
