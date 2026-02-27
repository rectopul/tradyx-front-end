import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiException } from "@/utils/api-errors";
import { getErrorMessage } from "../utils/api-errors";
import { api } from "@/services/api";
import { toast } from "sonner";
import { adminService } from "@/services/admin/auth";
import { useNavigate } from "react-router-dom";

export function adminAuth() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: admin, isLoading: isAuthChecking } = useQuery({
        queryKey: ["admin_auth"],
        queryFn: async () => {
            return await adminService.checkLogin();
        },
        retry: false,
        staleTime: Infinity, // Nunca fica stale até ser invalidado manualmente
        gcTime: Infinity, // Mantém no cache para sempre
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const isAuthenticated = !!admin;

    const loginMutation = useMutation({
        mutationFn: async (credentials: {
            email: string;
            password: string;
        }) => {
            // Primeiro, obtenha o cookie CSRF
            await api.get("/sanctum/csrf-cookie");
            return await adminService.login(credentials);
        },
        onSuccess: (data) => {
            localStorage.setItem("user_data", JSON.stringify(data.data));

            // Atualiza os dados de autenticação
            queryClient.setQueryData(["admin_auth"], data.data);

            // NÃO remove outras queries - mantém o cache intacto
            toast.success("Login realizado com sucesso!");
        },
        onError: (error) => {
            if (error instanceof ApiException) {
                toast.dismiss();
                toast.error("Credenciais inválidas");
            }
        },
    });

    const getFieldError = (fieldName: string): string | undefined => {
        if (
            loginMutation.error instanceof ApiException &&
            loginMutation.error.errors
        ) {
            return loginMutation.error.errors[fieldName]?.[0];
        }
        return undefined;
    };

    const logoutMutation = useMutation({
        mutationFn: () => adminService.logout(),
        onSuccess: () => {
            localStorage.removeItem("welcomePopupClosed");
            localStorage.removeItem("user_data");

            // CRÍTICO: Limpa APENAS as queries de autenticação
            // Mantém o cache de withdraws, deposits, etc.
            queryClient.setQueryData(["admin_auth"], null);

            // Invalida apenas as queries relacionadas à autenticação
            queryClient.invalidateQueries({
                queryKey: ["admin_auth"],
                exact: true,
            });

            // NÃO use removeQueries ou clear() aqui!
            // Isso remove TODOS os dados do cache, incluindo withdraws

            navigate("/admin/login", { replace: true });
            toast.success("Logout realizado com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao fazer logout");
        },
    });

    return {
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isLoading: loginMutation.isPending || isAuthChecking,
        isError: loginMutation.isError,
        error: loginMutation.error,
        isAuthenticated,
        admin: admin || null,
        getFieldError,
        getErrorMessage: () =>
            loginMutation.error
                ? getErrorMessage(loginMutation.error)
                : undefined,
    };
}
