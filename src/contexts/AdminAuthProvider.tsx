import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    useNavigate,
    useLocation,
    NavigateFunction,
    Location,
} from "react-router-dom";
import {
    adminAuthCheck,
    adminLogin,
    adminLogout,
} from "@/services/adminServices"; // Sua função existente
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react";
import { Admin } from "@/types";
import { toast } from "sonner";
import { useAdmin } from "./admin/admin-context";

// Tipos
interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    admin: Admin.Data | null;
    login: (payload: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    error: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
    navigate: NavigateFunction;
    location: Location;
}

// Criar contexto para autenticação
const AuthContext = createContext<AuthContextType | null>(null);

// Hook para uso no componente
export const useAuthAdmin = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro de um AuthProviderAdmin"
        );
    }
    return context;
};

// Provider base de autenticação
export const AuthProviderAdmin = ({
    children,
    navigate,
    location,
}: AuthProviderProps) => {
    const [admin, setAdmin] = useState<Admin.Data | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const queryClient = useQueryClient();

    // Verificar se há token no localStorage na inicialização
    const checkAuth = async () => {
        try {
            const storedAuth = await authCheck();
            if (storedAuth) {
                setAdmin(storedAuth.data.admin);
                setIsAuthenticated(true);
                // Em caso de erro no parsing, limpa o storage
            }
            setIsAuthenticated(false);
        } catch (e) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    // Mutação para login
    const loginMutation = useMutation({
        mutationFn: adminLogin,
        onSuccess: (response) => {
            if (response.status) {
                // Armazenar dados do admin e token
                localStorage.setItem("admin_token", response.token);
                setAdmin(response.data);
                setIsAuthenticated(true);
                localStorage.setItem(
                    "admin_auth",

                    JSON.stringify(response.data)
                );

                // Invalidar queries que dependem da autenticação
                queryClient.invalidateQueries({ queryKey: ["admin"] });

                // Redirecionar para a página anterior ou dashboard
                const origin =
                    location.state?.from?.pathname || "/admin/dashboard";
                navigate(origin, { replace: true });
            } else {
                setError(response.message || "Falha na autenticação");
            }
        },
        onError: (error: any) => {
            setError(
                error.response?.data?.message ||
                    "Erro ao conectar com o servidor"
            );
        },
    });

    // Função de logout
    const logout = async () => {
        try {
            await adminLogout();
            setAdmin(null);
            setIsAuthenticated(false);
            setError(null);
            queryClient.clear();
            navigate("/admin/login", { replace: true });
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    // Função de login
    const login = async (payload: { email: string; password: string }) => {
        setError(null);
        await loginMutation.mutateAsync({ payload });
    };

    const authCheck = async () => {
        try {
            const check = await adminAuthCheck();

            return check;
        } catch (error) {
            toast.error("Erro ao validar administrador");
        }
    };

    // Valor do contexto
    const value = {
        isAuthenticated,
        isLoading: loginMutation.isPending,
        admin,
        login,
        logout,
        error,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

// Componente para proteger rotas
export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoadingSettings, isAuthenticated } = useAdmin();

    useEffect(() => {
        // Só redirecionar se:
        // 1. Não estiver mais carregando
        // 2. Já verificou a sessão
        // 3. Não está autenticado no contexto
        if (!isAuthenticated && !isLoadingSettings) {
            console.log("Required auth:", isAuthenticated);
            console.log("Redirecionando para login: usuário não autenticado");
            navigate("/admin/login", { state: { from: location } });
        }
    }, [isAuthenticated, isLoadingSettings, navigate, location]);

    // Mostrar loading enquanto verifica autenticação OU enquanto verifica localStorage
    if (isLoadingSettings) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="text-gray-600">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    // Renderizar os filhos se autenticado no contexto OU se tiver token no localStorage
    return isAuthenticated ? <>{children}</> : null;
};
