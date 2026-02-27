import { useNavigate, useLocation } from "react-router-dom";
import { Home, Bookmark, Settings, MessageSquare, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/contexts/UserProvider";

export function FooterSidebar() {
    const navigation = useNavigate();
    const location = useLocation();
    const { user } = useUser();

    const navItems = [
        { icon: Home, path: "/", label: "Início" },
        { icon: Bookmark, path: "/purchases", label: "Planos" },
        { icon: Settings, path: "/withdraw_account", label: "Conta" },
        { icon: MessageSquare, path: "/support", label: "Suporte" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 h-20 px-6 flex items-center justify-between z-50">
            {navItems.map((item) => (
                <button
                    key={item.path}
                    onClick={() => navigation(item.path)}
                    className={`p-2 transition-colors ${
                        location.pathname === item.path
                            ? "text-black"
                            : "text-gray-300"
                    }`}
                >
                    <item.icon
                        size={24}
                        fill={location.pathname === item.path ? "currentColor" : "none"}
                    />
                </button>
            ))}
            <button
                onClick={() => navigation("/profile")}
                className="relative"
            >
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gray-100 text-gray-400">
                        {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>
            </button>
        </div>
    );
}
