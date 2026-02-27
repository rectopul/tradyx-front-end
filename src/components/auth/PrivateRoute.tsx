import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

export function PrivateRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    // Mostra loading enquanto verifica a autenticação
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Carregando...</span>
            </div>
        );
    }

    // Se não estiver autenticado, redireciona para login
    // Salva a localização atual para redirecionar depois do login
    if (!isAuthenticated) {
        // return <Navigate to="/login" state={{ from: location }} replace />;
        return (window.location.href = "/login");
    }

    // Se estiver autenticado, renderiza as rotas filhas
    return <Outlet />;
}
