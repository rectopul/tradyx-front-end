import * as React from "react";
import {
    GalleryVerticalEnd,
    Settings2,
    Users,
    LayoutDashboard,
    BanknoteArrowDown,
    Landmark,
    BanknoteArrowUp,
    Package,
    Network,
    ChartLine,
    Box,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();
    const pathname = location.pathname;

    // This is sample data.
    const data = useMemo(() => {
        const checkIsActive = (url: string) => pathname.startsWith(url);

        return {
            user: {
                name: "Administrador",
                email: "admin@admin.com",
                avatar: "/avatars/shadcn.jpg",
            },
            teams: [
                {
                    name: "Apax Invest",
                    logo: GalleryVerticalEnd,
                    plan: "Investimentos",
                },
            ],
            navMain: [
                {
                    title: "Depósitos de usuários",
                    url: "#",
                    icon: BanknoteArrowUp,
                    isActive: checkIsActive("/admin/deposits"),
                    items: [
                        {
                            title: "Todos os Depósitos",
                            url: "/admin/deposits",
                        },
                        {
                            title: "Configurações",
                            url: "/admin/deposits/settings",
                        },
                    ],
                },
                {
                    title: "Saques de usuários",
                    url: "#",
                    icon: BanknoteArrowDown,
                    isActive: checkIsActive("/admin/withdraws"),
                    items: [
                        {
                            title: "Todos os saques",
                            url: "/admin/withdraws",
                        },
                        {
                            title: "Configurações",
                            url: "/admin/withdraws/settings",
                        },
                    ],
                },
                {
                    title: "Pacotes",
                    url: "/admin/packages",
                    icon: Package,
                    isActive: checkIsActive("/admin/packages"),
                    items: [
                        {
                            title: "Todos os pacotes",
                            url: "/admin/packages",
                        },
                        {
                            title: "Novo pacote",
                            url: "#",
                        },
                    ],
                },
            ],
            projects: [
                {
                    name: "Investimentos",
                    url: "/admin/investments",
                    icon: Box,
                },
                {
                    name: "Dashboard",
                    url: "/admin/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    name: "Clientes",
                    url: "/admin/customers",
                    icon: Users,
                },
                {
                    name: "Gateways de pagamento",
                    url: "/admin/settings",
                    icon: Landmark,
                },
                {
                    name: "Comissões de indicação",
                    url: "/admin/rebate",
                    icon: Network,
                },
                {
                    name: "Registro de investimentos",
                    url: "/admin/settings",
                    icon: ChartLine,
                },
                {
                    name: "Configurações",
                    url: "/admin/settings",
                    icon: Settings2,
                },
            ],
        };
    }, [pathname]);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
