import React from "react";
import { Header } from "./Header";
import NotificationSystem from "../NotificationSystem";
import { FooterSidebar } from "./FooterSidebar";

interface PageLayoutProps {
    children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
    return (
        <>
            <div
                className={`flex w-full relative min-h-screen bg-background flex-col text-black font-sans overflow-hidden`}
            >
                <Header />
                <div className="flex flex-1 overflow-y-auto">
                    <main className="w-full flex-1 px-4 md:px-6">
                        {children}
                    </main>
                </div>
                <NotificationSystem />
                <FooterSidebar />
            </div>
        </>
    );
}
