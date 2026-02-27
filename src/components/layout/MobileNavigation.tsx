import {
    LayoutDashboard,
    Activity,
    Package,
    Award,
    Settings,
    User,
} from "lucide-react";
import React from "react";

const navItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: <LayoutDashboard className="h-5 w-5" />,
        mobileIcon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
        title: "Transações",
        href: "/transactions",
        icon: <Activity className="h-5 w-5" />,
        mobileIcon: <Activity className="h-5 w-5" />,
    },
    {
        title: "Planos",
        href: "/packages",
        icon: <Package className="h-5 w-5" />,
        mobileIcon: <Package className="h-5 w-5" />,
        primary: true, // Marcamos o item central como primário
    },
    {
        title: "Comissões",
        href: "/commissions",
        icon: <Award className="h-5 w-5" />,
        mobileIcon: <Award className="h-5 w-5" />,
    },
    {
        title: "Perfil",
        href: "/profile",
        icon: <Settings className="h-5 w-5" />,
        mobileIcon: <User className="h-5 w-5" />,
    },
];

export function MobileNavigation() {
    // Encontrar o índice do item principal (Planos)
    const primaryIndex = navItems.findIndex((item) => item.title === "Planos");

    // Separar os itens em grupos para o layout da barra de navegação
    const leftItems = navItems.slice(0, primaryIndex);
    const rightItems = navItems.slice(primaryIndex + 1);
    const primaryItem = navItems[primaryIndex];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
            <div className="relative h-16">
                {/* Container com os dois semicírculos para criar o recorte arredondado */}
                <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
                    {/* Semicírculo esquerdo */}
                    <div className="absolute left-0 bottom-0 w-1/2 h-16 bg-white border-t border-gray-200 shadow-lg rounded-tr-full">
                        <div className="flex h-full justify-around pr-3">
                            {leftItems.map((item, index) => (
                                <a
                                    key={`left-${index}`}
                                    href={item.href}
                                    className="flex flex-col items-center justify-center"
                                    style={{
                                        width: `${100 / leftItems.length}%`,
                                    }}
                                >
                                    <div className="p-2 rounded-full hover:bg-blue-50 transition-all duration-300">
                                        {item.mobileIcon}
                                    </div>
                                    <span className="text-xs font-medium mt-1">
                                        {item.title}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Semicírculo direito */}
                    <div className="absolute right-0 bottom-0 w-1/2 h-16 bg-white border-t border-gray-200 shadow-lg rounded-tl-full">
                        <div className="flex h-full justify-around pl-3">
                            {rightItems.map((item, index) => (
                                <a
                                    key={`right-${index}`}
                                    href={item.href}
                                    className="flex flex-col items-center justify-center"
                                    style={{
                                        width: `${100 / rightItems.length}%`,
                                    }}
                                >
                                    <div className="p-2 rounded-full hover:bg-blue-50 transition-all duration-300">
                                        {item.mobileIcon}
                                    </div>
                                    <span className="text-xs font-medium mt-1">
                                        {item.title}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Botão central flutuante (Planos) */}
                {primaryItem && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                        <a href={primaryItem.href} className="block">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all duration-300 hover:scale-110">
                                <div className="text-white">
                                    {React.cloneElement(
                                        primaryItem.mobileIcon,
                                        { className: "h-7 w-7 text-white" }
                                    )}
                                </div>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}
