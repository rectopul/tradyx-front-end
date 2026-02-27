import { Search, Bell } from "lucide-react";

export function HeaderHome() {
    return (
        <div className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
            <div className="flex-1 max-w-md relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-white/50 backdrop-blur-sm border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand shadow-sm"
                />
            </div>
            <button className="ml-4 p-3 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm relative group transition-all hover:bg-white">
                <Bell className="h-5 w-5 text-gray-600 group-hover:text-brand" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
        </div>
    );
}
