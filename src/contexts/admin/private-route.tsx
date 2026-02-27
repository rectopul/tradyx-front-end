import { useLocation, Navigate } from "react-router-dom";
import { adminAuth } from "@/hooks/adminAuth"; // Certifique-se de que o caminho está correto
import React from "react";

// Adicionamos a tipagem para a prop 'children'
interface AdminPrivateRouteProps {
    children: React.ReactNode;
}

// O componente AdminPrivateRoute deve receber 'children' como prop
export function AdminPrivateRoute({ children }: AdminPrivateRouteProps) {
    const { isAuthenticated, isLoading } = adminAuth();
    const location = useLocation();

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
    if (!isAuthenticated) {
        return (
            <Navigate to="/admin/login" state={{ from: location }} replace />
        );
    }

    // Se estiver autenticado, renderiza o componente filho (AdminLayout neste caso)
    return <>{children}</>;
}
