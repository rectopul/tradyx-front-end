import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/admin/AppSidebar";

import { Outlet } from "react-router-dom";

export function AdminLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="px-4 w-full">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    );
}
