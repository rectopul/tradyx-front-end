import axios from "axios";
import { ApiException, getErrorMessage } from "../utils/api-errors";

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
}

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export const siteUrl =
    import.meta.env.VITE_APP_MODE == "production"
        ? window.Laravel.appUrl
        : import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: siteUrl + "/api",
});

export const setupAxiosInterceptors = () => {
    api.interceptors.request.use(
        (config) => {
            config.headers = config.headers || {};

            if (config.url?.includes("sanctum/csrf-cookie")) {
                config.baseURL = siteUrl;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem("user_data");
            }
            return Promise.reject(error);
        }
    );
};

// Configurar interceptors ao iniciar a aplicação
setupAxiosInterceptors();

// Frontend api

export const frontEndApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8011/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptor para requisições
frontEndApi.interceptors.request.use(
    (config) => {
        // Certifique-se que config.headers existe
        config.headers = config.headers || {};

        // Obter token apenas do elemento HTML ou variável de ambiente
        const token = localStorage.getItem("auth_token");

        // Adicionar token se existir
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

frontEndApi.interceptors.response.use(
    (response) => response,
    (error) => {
        // Tratamento de erro global
        const errorMessage = getErrorMessage(error);

        // Se for erro de autenticação, limpa o token e redireciona
        if (error.response?.status === 401) {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user_data");
            // window.location.href = "/login";
        }

        return Promise.reject(
            new ApiException(
                errorMessage,
                error.response?.status,
                error.response?.data?.errors
            )
        );
    }
);
