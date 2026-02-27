import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export interface SettingOption {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    danger?: boolean;
}

interface SettingsMenuProps {
    options: SettingOption[];
}

export default function SettingsMenu({ options }: SettingsMenuProps) {
    const [activeOption, setActiveOption] = useState<SettingOption | null>(
        null
    );
    const { logout } = useAuth();

    return (
        <div className="relative w-full max-w-sm mx-auto">
            <AnimatePresence mode="wait">
                {!activeOption ? (
                    <motion.div
                        key="menu"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                    >
                        {options.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => setActiveOption(option)}
                                className={`flex items-center justify-between px-6 py-5 rounded-[24px] font-sans font-bold border transition-all cursor-pointer bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-brand/50 ${
                                    option.danger
                                        ? "border-red-100 bg-red-50 text-red-600"
                                        : "text-gray-900"
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl ${option.danger ? 'bg-red-100 text-red-600' : 'bg-brand/10 text-brand'}`}>
                                        {option.icon}
                                    </div>
                                    <span className="text-base font-bold">
                                        {option.title}
                                    </span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                            </div>
                        ))}
                        <button
                            onClick={() => logout()}
                            className={`flex w-full items-center justify-between px-6 py-5 rounded-[24px] font-sans font-bold border cursor-pointer transition-all bg-red-50 border-red-100 text-red-600 hover:bg-red-100 shadow-sm`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-red-100 text-red-600">
                                    <Power className="w-6 h-6" strokeWidth={3} />
                                </div>
                                <span className="font-bold text-base">
                                    Logout
                                </span>
                            </div>
                            <ChevronRight
                                className="w-5 h-5 text-red-300"
                                strokeWidth={3}
                            />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="details"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-gray-100"
                                onClick={() => setActiveOption(null)}
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-900" />
                            </Button>
                            <h2 className="text-xl font-bold text-gray-900">
                                {activeOption.title}
                            </h2>
                        </div>
                        <div className="p-2">
                            {activeOption.content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
