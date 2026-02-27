import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import AdminLayout from "./app/dashboard/page.tsx";
import AdminLoginPage from "./app/login/page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdminDashboard } from "@/components/admin/Dashboard.tsx";
import { Withdraws } from "./components/admin/withdraw/Withdraws.tsx";
import { WithdrawSettings } from "./components/admin/withdraw/Settings.tsx";
import { DepositPage } from "./pages/admin/DepositPage.tsx";
import { DepositSettings } from "./pages/admin/deposits/Settings.tsx";
import { PackagesPage } from "./pages/admin/packages/Package.tsx";
import { AdminSettings } from "./pages/admin/Settings.tsx";
import { ReferralConfigDashboard } from "./pages/admin/Referrals.tsx";
import { UserManagement } from "./pages/admin/customer/user-management.tsx";
import { InvestimentsPage } from "./pages/admin/investiments-page.tsx";
import { AdminProvider } from "@/contexts/AdminProvider.tsx";
import { AdminPrivateRoute } from "@/contexts/admin/private-route.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Criar cliente de query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Configurações para evitar refetches desnecessários
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnMount: false, // IMPORTANTE: não refaz query ao montar se dados estão em cache
            refetchOnReconnect: false,

            // Cache mais agressivo
            staleTime: 1000 * 60 * 5, // 5 minutos - dados considerados "frescos"
            gcTime: 1000 * 60 * 30, // 30 minutos - mantém no cache
        },
        mutations: {
            retry: 1,
        },
    },
});

// Componente wrapper para o AuthProvider
const AuthWrapper = () => {
    return <Outlet />;
};

// Configuração de rotas
const router = createBrowserRouter([
    {
        element: <AuthWrapper />,
        children: [
            {
                path: "/admin/login",
                element: <AdminLoginPage />,
            },
            {
                // Esta rota base ("/admin") é protegida pelo AdminPrivateRoute
                path: "/admin",
                element: (
                    <AdminPrivateRoute>
                        <AdminProvider>
                            <AdminLayout />
                        </AdminProvider>
                    </AdminPrivateRoute>
                ),
                children: [
                    {
                        path: "settings",
                        element: <AdminSettings />,
                    },
                    {
                        path: "rebate",
                        element: <ReferralConfigDashboard />,
                    },
                    {
                        path: "dashboard",
                        element: <AdminDashboard />,
                    },
                    {
                        path: "customers",
                        element: <UserManagement />,
                    },
                    {
                        path: "deposits",
                        element: <DepositPage />,
                    },
                    {
                        path: "deposits/settings",
                        element: <DepositSettings />,
                    },
                    // Rotas de saque
                    {
                        path: "withdraws",
                        element: <Withdraws />,
                    },
                    // Rotas de pacotes
                    {
                        path: "packages",
                        element: <PackagesPage />,
                    },
                    {
                        path: "withdraws/settings",
                        element: <WithdrawSettings />,
                    },
                    {
                        path: "investments",
                        element: <InvestimentsPage />,
                    },
                    // Outras rotas protegidas...
                ],
            },
        ],
    },
]);

function AdminApp() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <Toaster />
        </>
    );
}

export default AdminApp;
