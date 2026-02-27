import React from "react";
import { BarChart3, ChevronDown, BellIcon, UserCircle } from "lucide-react";

const DashboardHeader: React.FC = () => {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <BarChart3 className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-baseline space-x-4">
                                <a
                                    href="#"
                                    className="text-blue-700 font-medium rounded-md px-3 py-2 text-sm"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="#"
                                    className="text-slate-500 hover:text-slate-700 rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Investimentos
                                </a>
                                <a
                                    href="#"
                                    className="text-slate-500 hover:text-slate-700 rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Portfolio
                                </a>
                                <a
                                    href="#"
                                    className="bg-blue-50 text-blue-700 rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Programa de Referência
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="relative rounded-full bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 focus:outline-none"
                            >
                                <span className="absolute -inset-1.5"></span>
                                <BellIcon className="h-5 w-5" />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                            </button>

                            <div className="relative ml-3">
                                <div className="flex items-center gap-2">
                                    <UserCircle className="h-8 w-8 text-slate-500" />
                                    <span className="hidden lg:flex items-center text-sm">
                                        <span className="text-slate-700 font-medium">
                                            Investidor Premium
                                        </span>
                                        <ChevronDown
                                            size={16}
                                            className="ml-1 text-slate-400"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
