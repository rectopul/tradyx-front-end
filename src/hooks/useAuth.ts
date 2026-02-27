import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth";
import { ApiException } from "@/utils/api-errors";
import { getErrorMessage } from "../utils/api-errors";
import { LoginCredentials } from "@/types/api";
import { api } from "@/services/api";
import { toast } from "sonner";

export function useAuth() {
    const queryClient = useQueryClient();

    const { data: isAuthenticated, isLoading: isAuthChecking } = useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            return await authService.validateToken();
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            // Primeiro, obtenha o cookie CSRF
            await api.get("/sanctum/csrf-cookie");
            return await authService.login(credentials);
        },
        onSuccess: (data) => {
            console.log("dados recuperados do usuario", data.data.user);
            localStorage.setItem("user_data", JSON.stringify(data.data));
            // Atualizando os dados em sequência
            queryClient.setQueryData(["auth"], true);
            queryClient.setQueryData(["user"], data.data.user);
        },
        onError: (error) => {
            if (error instanceof ApiException) {
                // Aqui você pode lidar com o erro, como exibir uma mensagem de erro
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
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            localStorage.removeItem("welcomePopupClosed");
            // Definindo explicitamente os estados antes de limpar
            queryClient.setQueryData(["auth"], null);
            queryClient.setQueryData(["user"], null);
            // Removendo clear() para evitar problemas de cache
            queryClient.removeQueries({ queryKey: ["auth"] });
            queryClient.removeQueries({ queryKey: ["user"] });
            window.location.href = "/login";
        },
    });

    return {
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isLoading: loginMutation.isPending || isAuthChecking,
        isError: loginMutation.isError,
        error: loginMutation.error,
        isAuthenticated,
        getFieldError,
        getErrorMessage: () =>
            loginMutation.error
                ? getErrorMessage(loginMutation.error)
                : undefined,
    };
}
