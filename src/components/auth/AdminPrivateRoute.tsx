import { useAuthAdmin } from "@/contexts/AdminAuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export function AdminPrivateRoute() {
    const { isAuthenticated, isLoading } = useAuthAdmin();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}
