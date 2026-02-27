import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Settings, LogOut, X, User, TrendingUp, Activity } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import {
    Comissions,
    Cycles,
    Dashboard,
    Telegram,
    Transactions,
    Whatsapp,
} from "../icons/lib";
import { useUser } from "@/contexts/UserProvider";
import { useState, useEffect } from "react";
import { MobileNavigation } from "./MobileNavigation";
import { formatCurrency } from "@/utils/formatters";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: <Dashboard />,
        mobileIcon: <Dashboard />,
    },
    {
        title: "Transações",
        href: "/transactions",
        icon: <Transactions />,
        mobileIcon: <Transactions />,
    },
    {
        title: "Ciclos",
        href: "/packages",
        icon: <Cycles />,
        mobileIcon: <Cycles />,
    },
    {
        title: "Comissões",
        href: "/commissions",
        icon: <Comissions />,
        mobileIcon: <Comissions />,
    },
    {
        title: "Missões",
        href: "/challenges",
        icon: <Activity />,
        mobileIcon: <Activity />,
    },
    {
        title: "Perfil",
        href: "/profile",
        icon: <Settings className="h-5 w-5" />,
        mobileIcon: <User className="h-5 w-5" />,
    },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const { logout } = useAuth();
    const { settings } = useUser();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const { user } = useUser();

    // Detectar mudanças no tamanho da tela para responsividade
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Footer mobile navigation
    if (isMobile) {
        return (
            <>
                {/* Mobile Overlay Menu */}
                {isOpen && (
                    <div className="fixed inset-0 z-40 flex flex-col bg-white">
                        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                                    <span className="text-lg font-bold">A</span>
                                </div>
                                <span className="text-xl font-semibold text-blue-600">
                                    {settings?.site_name}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-blue-600 hover:bg-red-50"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <ScrollArea className="flex-1">
                            <div className="px-3 py-4">
                                <nav className="space-y-1">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            className={cn(
                                                "flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors",
                                                location.pathname === item.href
                                                    ? "bg-red-50 text-blue-600"
                                                    : "text-gray-700 hover:bg-red-50 hover:text-blue-600"
                                            )}
                                            onClick={onClose}
                                        >
                                            {item.icon}
                                            <span className="ml-3">
                                                {item.title}
                                            </span>
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-6 border-t border-gray-200 pt-4">
                                    <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Comunidade
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            window.open(settings?.whatsapp_link)
                                        }
                                        className="mt-2 w-full justify-start px-4 text-gray-700 hover:bg-red-50 hover:text-blue-600"
                                    >
                                        <Whatsapp size={16} className="mr-3" />
                                        Grupo do Whatsapp
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            window.open(settings?.telegram_link)
                                        }
                                        className="mt-1 w-full justify-start px-4 text-gray-700 hover:bg-red-50 hover:text-blue-600"
                                    >
                                        <Telegram size={16} className="mr-3" />
                                        Grupo do Telegram
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => logout()}
                                        className="mt-4 w-full justify-start px-4 text-blue-600 hover:bg-red-50"
                                    >
                                        <LogOut className="mr-3 h-4 w-4" />
                                        Sair
                                    </Button>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                )}

                <MobileNavigation />
            </>
        );
    }

    return (
        <>
            {/* Desktop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-lg rounded-r-2xl border-r border-gray-100 transition-transform duration-300 ease-in-out overflow-hidden hover:shadow-xl lg:static lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <ScrollArea className="h-screen">
                    <div className="p-5">
                        {/* User Profile Card */}
                        <div className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                            <div className="grid grid-cols-[40px_auto] mb-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-500">
                                        Bem-vindo
                                    </p>
                                    <h3 className="font-bold text-gray-800">
                                        {user?.name || "Usuário"}
                                    </h3>
                                </div>
                            </div>
                            {user && (
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-xs text-gray-500">
                                        Saldo de Lucros
                                    </p>
                                    <p className="text-lg font-bold text-blue-600">
                                        {formatCurrency(user.profit_balance)}
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                        <p className="text-xs text-green-500 ml-1">
                                            +2,4% esta semana
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation */}
                        <nav className="mb-6">
                            <ul className="space-y-1">
                                {navItems.slice(0, 5).map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            to={item.href}
                                            className={cn(
                                                "flex items-center px-4 py-3 rounded-xl transition-all duration-200",
                                                location.pathname === item.href
                                                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                                                    : "text-gray-700 hover:bg-gray-50"
                                            )}
                                            onClick={onClose}
                                        >
                                            {item.icon}
                                            <span className="ml-3">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Invest Button */}
                        <div className="mb-6">
                            <Button
                                onClick={() => navigate("/packages")}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                            >
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Investir Agora
                            </Button>
                        </div>

                        {/* Support Section */}
                        <div className="mb-6 space-y-2">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-2">
                                Suporte
                            </p>
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    window.open(settings?.telegram_link)
                                }
                                className="flex items-center w-full px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 border border-gray-100"
                            >
                                <Telegram
                                    size={20}
                                    className="text-blue-500 mr-3"
                                />
                                Ajuda no Telegram
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    window.open(settings?.whatsapp_link)
                                }
                                className="flex items-center w-full px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 border border-gray-100"
                            >
                                <Whatsapp
                                    size={20}
                                    className="text-green-500 mr-3"
                                />
                                Ajuda no WhatsApp
                            </Button>
                        </div>

                        {/* Settings & Logout */}
                        <div className="pt-4 border-t border-gray-100">
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        to="/profile"
                                        className="flex items-center px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                                        onClick={onClose}
                                    >
                                        <Settings className="h-5 w-5 mr-3" />
                                        Configurações
                                    </Link>
                                </li>
                                <li>
                                    <Button
                                        variant="ghost"
                                        onClick={() => logout()}
                                        className="w-full flex items-center justify-start px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
                                    >
                                        <LogOut className="h-5 w-5 mr-3" />
                                        Sair
                                    </Button>
                                </li>
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                © {new Date().getFullYear()}{" "}
                                {settings?.site_name}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Todos os direitos reservados
                            </p>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    );
}
